const pool = require('../db');

exports.getAllCountry = (req, res) => {
    pool.query("SELECT * FROM country", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        const response = results.rows;
        res.json({ success: true, data: response });
    });
    
}

exports.getAllStateByCountry = (req, res) => {
    pool.query("SELECT * FROM state WHERE cid IN (" + req.body.cid + ")", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        const response = results.rows;
        res.json({ success: true, data: response });
    })

}