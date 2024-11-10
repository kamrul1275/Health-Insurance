const express = require('express');
const roleController = require('../controllers/roleController');
// const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
// const upload = multer(); // Initialize multer
// Set up multer for file uploads
const upload = multer({
    dest: 'uploads/', // Destination folder
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB file size limit
});

const router = express.Router();
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


router.get('/roles', roleController.getRoles);
router.get('/role/create', roleController.create);
router.get('/role/edit/:id', roleController.getRoleById);
router.put('/role/update/:id', upload.none(), roleController.updateRole); // Use multer for form-data
router.delete('/role/delete/:id', roleController.deleteRole);


module.exports = router;