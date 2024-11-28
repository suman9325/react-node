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

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/fileUploads'); // Directory to save files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Filename to save as
    }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });
const fileHandler = multer({ storage: fileStorage });

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
const fileUploadController = require('./controllers/FileUploadController');

// Routes
app.post('/api/getUser', usersController.getUser);
app.post('/api/getFilteredUsers', usersController.getFilteredUsers);
app.post('/api/addUpdateUser', usersController.addUpdateUser);

app.get('/api/getAllCountry', countryStateCityController.getAllCountry);
app.post('/api/getAllStateByCountry', countryStateCityController.getAllStateByCountry);

app.get('/api/getAllEnquiry', enquiryController.getAllEnquiry);
app.post('/api/activeInactiveEnquiry', enquiryController.activeInactiveEnquiry);
app.post('/api/filterActiveInactiveEnquiry', enquiryController.filterActiveInactiveEnquiry);

app.get('/api/getAllEnquiryDocuments', enquiryController.getAllEnquiryDocuments);
app.post('/api/saveEnquiryDocument', upload.single('document'), enquiryController.saveEnquiryDocument);
app.post('/api/downloadEnquiryDocument', enquiryController.downloadEnquiryDocument);

app.post('/api/uploadSingleFile', fileHandler.single('document'), fileUploadController.uploadSingleFile)

// Middleware

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
