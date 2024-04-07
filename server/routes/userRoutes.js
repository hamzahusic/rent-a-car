const express = require("express");
const mysqlPool = require('../connection');
const bcrypt = require('bcrypt');

const router = express.Router();

//REGISTER USER
router.post("/register", async (req,res) => {

    try {
        const { ime, prezime,sifra, email} = req.body;

        const sqlCheck = 'SELECT korisnik.email FROM korisnik WHERE email = ?';

        mysqlPool.query(sqlCheck, [email], (error,results) => {
            if (error) {
                console.error(error);
                return res.status(500).send("Internal server error");
            }
        
            if (results.length != 0) {
                return res.status(404).json({ message: 'User already exists' });
            }
            
            const sql = 'INSERT INTO korisnik (ime, prezime, sifra, email,uloga) VALUES (?, ?, ?, ?,?)';
        
            const saltRounds = 10;

            bcrypt.hash(sifra, saltRounds, (err,hashPass) => {
                
                if (err) {
                    console.error("Bcrypt error:", err);
                    return res.status(500).send('Error occurred during password hashing');
                }

                mysqlPool.query(sql, [ime, prezime, hashPass, email, "user"], (error,finalResult) => {
                    
                    if (error) {
                        console.error(error);
                        return res.status(500).send('Greška prilikom kreiranja korisnika');
                    } else {
                        return res.status(200).json({ message: 'Korisnik kreiran', "User data": finalResult });
                    }
                    
                });
            
            });
        
        });               
    
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
);

//LOGIN USER

router.post("/login", async (req,res) => {

    try {
        const { email, sifra} = req.body;

        const sql = 'SELECT korisnik.id,korisnik.ime,korisnik.prezime,korisnik.email,korisnik.sifra,korisnik.uloga FROM korisnik WHERE email = ?';

        mysqlPool.query(sql, [email], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Internal server error");
            }
        
            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
        
            const user = results[0]; 
            
            bcrypt.compare(sifra, user.sifra, (compareErr, isValidPassword) => {
                if (compareErr) {
                    console.error(compareErr);
                    return res.status(500).send("Internal server error");
                }
        
                if (isValidPassword) {
                    const userData = {...user,sifra : undefined};
                    return res.status(200).json({ message: 'Validan korisnik', userInfo: userData });
                } else {
                    return res.status(404).json({ message: 'Pogresna sifra' });
                }
            });
        });  
      
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }

})

module.exports = router;