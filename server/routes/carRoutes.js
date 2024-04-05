const express = require("express");
const mysqlPool = require('../db/connection');
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

        const sql = "INSERT INTO objava (naziv,proizvodjac,mjesta,transmisija,pogon,opis,slika,cijena_po_danu,kategorija_id,korisnik_id) VALUES (?,?,?,?,?,?,?,?,?,?)";
    
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

//JEDAN AUTOMOBIL
router.get('/car/:id', async (req,res) => {
    try {
        const {id} = req.params;
    
        const sql = "SELECT automobil.id,automobil.naziv,automobil.proizvodjac,automobil.mjesta,automobil.transmisija,automobil.pogon,automobil.opis,automobil.slika,automobil.cijena_po_danu, kategorija.naziv as kategorija FROM automobil INNER JOIN kategorija ON automobil.kategorija_id = kategorija.id WHERE automobil.id = ?";
    
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

//GET SVE OBJAVE
router.get('/all', async (req,res) => {
    try {

        const sql = "SELECT idObjava, naslov, sadrzaj,datum_objave,putanja_slike,kategorija_idKategorija as kategorija,ime,prezime,naziv as naziv_kategorije FROM objava INNER JOIN korisnik ON korisnik_idKorisnik = idKorisnik INNER JOIN kategorija ON kategorija_idKategorija = idKategorija;";
    
        mysqlPool.query(sql, (err,result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating objava');
            } else {
                return res.status(200).json({ message: 'objava selected successfully', "Data": result });
            }
        })
    } catch (error) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

//UPDATE OBJAVU
router.put('/',uploadStorage.single("putanja_slike"), async (req,res) => {
    try {
        const {naslov,sadrzaj,datum_objave,kategorija,idObjava,stara_slika} = req.body;
        
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

        const sql = "UPDATE objava SET naslov = ?, sadrzaj = ?, datum_objave = ?, kategorija_idKategorija = ?, putanja_slike = ? WHERE idObjava = ?; ";
    
        mysqlPool.query(sql,[naslov,sadrzaj,datum_objave,kategorija,req.file.filename,idObjava], (err,result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating objava');
            } else {
                return res.status(200).json({ message: 'objava updated successfully', "Data": result });
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
        const {idObjava,ime_slike} = req.body;
    
        const sql = "DELETE FROM objava WHERE idObjava = ?;";
    
        mysqlPool.query(sql,[idObjava], (err,result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error deleting objava');
            } else {
                try {
                    fs.unlinkSync(`../client/public/uploads/${ime_slike}`);
                } catch (error) {
                    console.log("No image found!");
                }
                return res.status(200).json({ message: 'objava deleted successfully', "Record deleted": result });
            }
        })
    } catch (error) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
})


module.exports = router;