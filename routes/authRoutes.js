const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
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

router.post('/register', upload.none(), authController.register);
router.post('/login', upload.none(), authController.login);

router.get('/users', authController.getUsers);
router.get('/users/search', authController.searchUsers);

router.get('/dashboard', authMiddleware, authController.dashboard);
router.get('/user/:id', authController.getUserById);
router.put('/user/:id', upload.none(), authController.updateUser); // Use multer for form-data
router.delete('/user/delete/:id', authController.deleteUser);
router.post('/logout', authController.logout);

module.exports = router;