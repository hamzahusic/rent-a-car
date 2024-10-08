const express = require("express");
const mysqlPool = require('../connection');
const multer = require("multer");
const router = express.Router();
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/uploads/')
    },
    filename: function (req, file, cb) {
      const randomNumbers = Date.now();
      cb(null, randomNumbers + file.originalname)
    }
})

const uploadStorage = multer({ storage: storage })
  
//KREIRAJ AUTOMOBIL
router.post('/',uploadStorage.single("slika"), async (req,res) => {

    try {
        const {naziv,proizvodjac,mjesta,transmisija,pogon,opis,cijena,idKategorija,idKorisnik} = req.body;

        const sql = "INSERT INTO automobil (naziv,proizvodjac,mjesta,transmisija,pogon,opis,slika,cijena_po_danu,kategorija_id,korisnik_id) VALUES (?,?,?,?,?,?,?,?,?,?)";
    
        mysqlPool.query(sql,[naziv,proizvodjac,mjesta,transmisija,pogon,opis,req.file.filename,cijena,idKategorija,idKorisnik], (err,result) => {
            if (err) {
                console.error(err);
                try {
                    fs.unlinkSync(`../client/public/uploads/${req.file.filename}`);
                } catch (error) {
                    console.log("Slika nije pronadjena");
                }
                return res.status(500).send('Greška prilikom kreiranja objave');
            } else {
                return res.status(200).json({ message: 'Automobil kreiran uspješno', "data": result });
            }
        })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }

})

//CHECK AVAILABILITY

router.post('/check', async (req,res) => {
    try {
        const {carId,datumNovogPocetka} = req.body;

        const sql = "SELECT * FROM rentacar.iznajmljeni_automobili WHERE car_id=?;"

        mysqlPool.query(sql, [carId], (err,result) => {
            if(err)
                return res.status(500).send('Greška prilikom dobijanja automobila');

            if(result.length == 0)
                return res.status(200).json({message:"Automobil nije iznajmljen"});

            const datum_novog_pocetka = new Date(datumNovogPocetka).setHours(0,0,0,0);
            const datum_isteka = new Date(result[0].kraj_iznajmljivanja).setHours(0,0,0,0);;
            const today = new Date().setHours(0,0,0,0)

            if(datum_novog_pocetka > datum_isteka && today > datum_isteka){

                const sqlRemove = "DELETE FROM rentacar.iznajmljeni_automobili WHERE car_id = ?;";

                mysqlPool.query(sqlRemove,[carId], (err,result) => {
                    if(err)
                        return res.status(500).send('Greška prilikom brisanja automobila iz liste');   
                })

                return res.status(200).json({message:"Automobil nije iznajmljen"});
            }

            return res.status(200).json({message:"Automobil je iznajmljen"});
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
})

//RENT A CAR
router.post('/rent', async (req,res) => {
    try {
        const {pocetak_iznajmljivanja,kraj_iznajmljivanja,carId,korisnik_id,ukupna_cijena} = req.body;

        const sql = "INSERT INTO iznajmljeni_automobili (pocetak_iznajmljivanja,kraj_iznajmljivanja,car_id,korisnik_id,ukupna_cijena) VALUES (?,?,?,?,?);"

        mysqlPool.query(sql, [pocetak_iznajmljivanja,kraj_iznajmljivanja,carId,korisnik_id,ukupna_cijena], (err,result) => {
            if(err)
                return res.status(500).send('Greška prilikom dobijanja automobila');

            return res.status(200).json({message:"Uspjesno iznajmljen automobil", data:result})
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
})

//GET ALL RENTED CARS

router.get('/allrentedcars', async (req,res) => {

    try {
        const sql = "SELECT iznajmljeni_automobili.id,iznajmljeni_automobili.pocetak_iznajmljivanja, iznajmljeni_automobili.kraj_iznajmljivanja, iznajmljeni_automobili.ukupna_cijena, automobil.naziv, automobil.slika, korisnik.ime, korisnik.prezime, korisnik.email FROM rentacar.iznajmljeni_automobili INNER JOIN rentacar.automobil ON iznajmljeni_automobili.car_id = automobil.id INNER JOIN rentacar.korisnik ON iznajmljeni_automobili.korisnik_id = korisnik.id;"
    
        mysqlPool.query(sql, (err,result) => {
            if(err)
                return res.status(500).send('Greška prilikom dobijanja iznajmljenih automobila');

            return res.status(200).json({ message: 'Iznajmljeni automobili', data: result });
        })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }

})

//GET SVE OBJAVE
router.get('/all', async (req,res) => {
    try {

        const sql = "SELECT automobil.id,automobil.naziv,automobil.proizvodjac,automobil.mjesta,automobil.transmisija,automobil.pogon,automobil.opis,automobil.slika,automobil.cijena_po_danu, kategorija.naziv as kategorija, kategorija.id as kategorija_id FROM automobil INNER JOIN kategorija ON automobil.kategorija_id = kategorija.id;";
    
        mysqlPool.query(sql, (err,result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Greška prilikom dobijanja svih automobila');
            } else {
                return res.status(200).json({ message: 'Automobil selected successfully', data: result });
            }
        })
    } catch (error) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

//JEDAN AUTOMOBIL
router.get('/:id', async (req,res) => {
    try {
        const {id} = req.params;
    
        const sql = "SELECT automobil.id,automobil.naziv,automobil.proizvodjac,automobil.mjesta,automobil.transmisija,automobil.pogon,automobil.opis,automobil.slika,automobil.cijena_po_danu, kategorija.naziv as kategorija, kategorija.id as kategorija_id FROM automobil INNER JOIN kategorija ON automobil.kategorija_id = kategorija.id WHERE automobil.id = ?;";
    
        mysqlPool.query(sql,[id], (err,result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Greška prilikom dobijanja automobila');
            } else {
                if(result.length === 0){
                    return res.status(404).json({ message: 'No automobil found'});
                }
                return res.status(200).json({ message: 'Automobil selected successfully', data: result });
            }
        })
    } catch (error) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

//UPDATE OBJAVU
router.put('/',uploadStorage.single("slika"), async (req,res) => {
    try {
        const {idAutomobil,naziv,proizvodjac,mjesta,transmisija,pogon,opis,cijena,idKategorija,idKorisnik,stara_slika} = req.body;
        
        if(req.file){
            try {
                fs.unlinkSync(`../client/public/uploads/${stara_slika}`);
            } catch (error) {
                console.log("No image found!");
            }
        }
        else{
            req.file = { filename: stara_slika };
        }

        const sql = "UPDATE automobil SET naziv = ?, proizvodjac = ?, mjesta = ?, transmisija = ?, pogon = ?, slika = ?, cijena_po_danu = ?, opis = ?, kategorija_id = ?, korisnik_id = ? WHERE id = ?; ";
    
        mysqlPool.query(sql,[naziv,proizvodjac,mjesta,transmisija,pogon,req.file.filename,cijena,opis,idKategorija,idKorisnik,idAutomobil], (err,result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Greška prilikom izmjene podataka automobila');
            } else {
                return res.status(200).json({ message: 'Automobil updated successfully', data: result });
            }
        })
    } catch (error) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

//DELETE OBJAVU
router.delete('/', async (req,res) => {
    try {
        const {id,slika} = req.query;
        
        const sql = "DELETE FROM automobil WHERE id = ?;";
    
        mysqlPool.query(sql,[id], (err,result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error deleting objava');
            } else {
                try {
                    fs.unlinkSync(`../client/public/uploads/${slika}`);
                } catch (error) {
                    console.log("Fotografija nije pronađena!");
                }
                return res.status(200).json({ message: 'Automobil deleted successfully', "Record deleted": result });
            }
        })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
})


module.exports = router;