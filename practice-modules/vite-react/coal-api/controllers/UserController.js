// controllers/usersController.js
const pool = require('../db'); // Assuming your database connection pool is in a 'db.js' file

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

exports.addUpdateUser = (req, res) => {

    let values;
    let query;
    if ('id' in req.body) {
        values = [
            req.body.id,
            req.body.name,
            req.body.email,
            req.body.password, // Ensure this is hashed
            req.body.contact,
            req.body.gender,
            req.body.language,
            req.body.address,
            req.body.dob,
            req.body.country,
        ];
        query = `
        UPDATE tbl_add_user
        SET 
            name = $2,
            email = $3,
            password = $4,
            contact = $5,
            gender = $6,
            language = $7,
            address = $8,
            dob = $9,
            country = $10
        WHERE id = $1
    `;
    }
    else {
        values = [
            req.body.name,
            req.body.email,
            req.body.password, // Ensure this is hashed
            req.body.contact,
            req.body.gender,
            req.body.language,
            req.body.address,
            req.body.dob,
            req.body.country,
        ];
        query = `
            INSERT INTO tbl_add_user 
            (
                name, 
                email, 
                password, 
                contact, 
                gender,
                language,
                address, 
                dob, 
                country 
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING id
        `;
    }

    pool.query(query, values, (error, result) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Something Went Wrong!', error: error });
        } else {
            if ('id' in req.body)
                return res.status(200).json({ success: true, message: 'User Updated Successfully' });
            else
                return res.status(200).json({ success: true, message: 'User Added Successfully', userId: result.rows[0].id });
        }
    });
};

exports.getUser = (req, res) => {

    const id = req.body.id;

    if (id == '' || id == null) {
        pool.query('SELECT * FROM tbl_add_user', (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
            const response = results.rows;
            res.json({ success: true, data: response });
        });
    } else {
        pool.query('SELECT * FROM tbl_add_user WHERE id = $1', [id], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
            const response = results.rows[0];
            res.json({ success: true, data: response });
        });
    }

};

exports.searchUser = (req, res) => {
    const searchParam = req.body.searchParam;
    if (!!searchParam) {
        pool.query('SELECT * FROM tbl_add_user WHERE name LIKE $1', [`%${searchParam}%`], (error, results) => {
            if (error) {
                return res.status(200).json({ message: 'No Record Found' });
            }
            const response = results.rows;
            return res.status(200).json({ success: true, data: response });
        });
    } else {
        return res.status(400).json({ message: 'Search text missing' });
    }
};


