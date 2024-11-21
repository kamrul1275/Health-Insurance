const express = require('express');
const router = express.Router();
const multer = require('multer');
const healthinsuranceController = require('../controllers/healthinsuranceController');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' }); // Temporary upload folder


// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Specify the filename
    }
});

// Configure Multer upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    fileFilter: function (req, file, cb) {
        // Accept only certain file types
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    }
});




// app.post('/your-endpoint', upload.fields([
//     { name: 'nomineeImageFront', maxCount: 1 },
//     { name: 'nomineeImageBack', maxCount: 1 }
// ]), yourControllerFunction);


// Define the route with Multer middleware
router.post('/health_insurance/store',upload.fields([
    { name: 'nomineeImageFront', maxCount: 1 },
    { name: 'nomineeImageBack', maxCount: 1 }
]), healthinsuranceController.storeHealthInsurance);

router.get('/health_insurance', healthinsuranceController.getHealthInsurance);

module.exports = router;