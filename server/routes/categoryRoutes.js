const express = require("express");
const mysqlPool = require('../connection');

const router = express.Router();

router.get("/", async (req,res) => {

    try {

        let sql = 'SELECT kategorija.id, kategorija.naziv FROM kategorija';

        mysqlPool.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Internal server error");
            }
           
            return res.status(200).json({ message: 'Kategorija selected successfully', categories: results });
        });
        
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }

})

module.exports = router;