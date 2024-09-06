const pool = require('../db');

exports.getAllCountry = (req, res) => {
    pool.query("SELECT * FROM country", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        res.json({ success: true, countryList: results });
    })
}

exports.getAllStateByCountry = (req, res) => {
    pool.query("SELECT * FROM state WHERE cid IN (" + req.body.cid + ")", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        res.json({ success: true, stateList: results });
    })

}