const express = require('express');
const permissionController = require('../controllers/permissionController');
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


router.get('/permissions', permissionController.getPermissions);
router.post('/permission/create', permissionController.createPermission);
router.get('/permission/edit/:id', permissionController.getPermissionById);
router.put('/permission/update/:id', upload.none(), permissionController.updatePermission); // Use multer for form-data
router.delete('/permission/delete/:id', permissionController.deletePermission);


module.exports = router;