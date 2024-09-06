// server.js
const express = require('express');
const cors = require('cors'); // Import CORS middleware

// ---------------------- FILE UPLOAD CONFIG START ----------------------------

const multer = require('multer');
const path = require('path');

// Set up storage and filename handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/enquiry_docs'); // Directory to save files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Filename to save as
    }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// Create uploads directory if it doesn't exist (optional)

// const fs = require('fs');
// const uploadDir = 'uploads';
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }


// ---------------------- FILE UPLOAD CONFIG END ----------------------------

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// controllers declaration
const usersController = require('./controllers/UserController');
const countryStateCityController = require('./controllers/CountryStateCityController');
const enquiryController = require('./controllers/EnquiryController');

// Routes
app.get('/api/getAllusers', usersController.getAllUsers);
app.post('/api/createUser', usersController.insertUser);

app.get('/api/getAllCountry', countryStateCityController.getAllCountry);
app.post('/api/getAllStateByCountry', countryStateCityController.getAllStateByCountry);

app.get('/api/getAllEnquiry', enquiryController.getAllEnquiry);
app.post('/api/activeInactiveEnquiry', enquiryController.activeInactiveEnquiry);
app.post('/api/filterActiveInactiveEnquiry', enquiryController.filterActiveInactiveEnquiry);

app.get('/api/getAllEnquiryDocuments', enquiryController.getAllEnquiryDocuments);
app.post('/api/saveEnquiryDocument', upload.single('document'), enquiryController.saveEnquiryDocument);
app.post('/api/downloadEnquiryDocument', enquiryController.downloadEnquiryDocument);

// Middleware

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
