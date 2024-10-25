// controllers/usersController.js
const pool = require('../db'); // Assuming your database connection pool is in a 'db.js' file

// Get all users
exports.getAllUsers = (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        const response = results.rows;
        res.json({ success: true, data: response });
    });
};

// Get filtered users
exports.getFilteredUsers = (req, res) => {

    const cid = req.body.cid;
    const sid = req.body.sid;

    if (cid == '' || cid == null) {
        pool.query('SELECT * FROM users', (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
            const response = results.rows;
            res.json({ success: true, data: response });
        });
    } else {
        if (!!cid && (sid == '' || sid == null)) {
            pool.query('SELECT * FROM users WHERE cid = $1', [cid], (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ message: 'Internal server error' });
                }
                const response = results.rows;
                res.json({ success: true, data: response });
            });
        }
        else {
            pool.query('SELECT * FROM users WHERE cid = $1 AND sid = $2', [cid, sid], (error, results) => {

                if (error) {
                    console.error(error);
                    return res.status(500).json({ message: 'Internal server error' });
                }
                const response = results.rows;
                res.json({ success: true, data: response });
            });
        }
    }

};

// Insert user

exports.insertUser = (req, res) => {
    pool.query('INSERT INTO enquiry VALUES (?,?,?,?,?)', ['', req.body.name, req.body.address, req.body.contact, req.body.description], (error, result) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'User not inserted', error: error });
        } else {
            return res.status(200).json({ success: true, message: 'User inserted successfully', userId: result.insertId });
        }
    })
}
