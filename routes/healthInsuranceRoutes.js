const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require("path");
const multer = require('multer');
// const upload = require('./path/to/multer/setup');

const healthinsuranceController = require('../controllers/healthinsuranceController');

// const storage = multer.memoryStorage();

// const upload = multer({ storage: storage });

// Set up multer for file handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads"); // Save files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file
    },
});

const upload = multer({ storage: storage });

// router.post('/health_insurance/store',  upload.fields([
//         { name: 'nomineeImageFront', maxCount: 1 },
//         { name: 'nomineeImageBack', maxCount: 1 }
//     ]), healthinsuranceController.storeHealthInsurance);


router.post('/health_insurance/store',  upload.fields([
    { name: 'nomineeImageFront', maxCount: 1 },
    { name: 'nomineeImageBack', maxCount: 1 }
]), healthinsuranceController.storeHealthInsurance);


 router.get('/health_insurance', healthinsuranceController.getHealthInsurance);

module.exports = router