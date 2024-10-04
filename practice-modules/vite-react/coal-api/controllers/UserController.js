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
