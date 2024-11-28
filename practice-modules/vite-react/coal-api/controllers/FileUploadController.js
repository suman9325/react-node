const pool = require('../db');
const path = require('path');

exports.uploadSingleFile = async (req, res) => {

    try {
        if (!req.myFile) {
            return res.status(400).json({ success: false, message: 'Bad Request' });
        }

        console.log(req.myFile);
        
        // Extract file details
        // const { filename, path: filePath, mimetype, size } = req.file;
        // // const { feedback } = req.body.feedback;

        // // Insert file details into the enquirydocuments table
        // const query = `
        //     INSERT INTO enquirydocuments (id, name, size, path, type)
        //     VALUES (?, ?, ?, ?, ?)
        // `;

        // await pool.query(query, [req.body.feedback, filename, filePath, mimetype, size], (err, results) => {
        //     if (err) {
        //         console.error(err);
        //         return res.status(500).json({ success: false, message: 'Something Went Wrong!' });
        //     }

        //     // Send success response
        //     return res.status(200).json({ success: true, message: 'File Uploaded Successfully!' });
        // });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Please Select a File!' });
    }
};