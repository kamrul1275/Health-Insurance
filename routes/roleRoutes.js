const express = require('express');
const roleController = require('../controllers/roleController');
const roleMiddleware = require('../middleware/roleMiddleware');
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


router.get('/roles', roleMiddleware, roleController.getRoles);
router.get('/role/create', roleMiddleware, roleController.create);
router.get('/role/edit/:id', roleMiddleware, roleController.getRoleById);
router.put('/role/update/:id', upload.none(), roleMiddleware, roleController.updateRole); // Use multer for form-data
router.delete('/role/delete/:id', roleMiddleware, roleController.deleteRole);


module.exports = router;