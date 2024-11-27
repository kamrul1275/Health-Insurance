const express = require('express');
const moduleController = require('../controllers/moduleController');
// const roleMiddleware = require('../middleware/moduleMiddleware');


const multer = require('multer');

const upload = multer({
    dest: 'uploads/', // Destination folder
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB file size limit
});

const router = express.Router();
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


router.get('/modules',moduleController.getModules);
router.post('/module/create',upload.none(),moduleController.createModule);

// router.get('/module/edit/:id',moduleController.getRoleById);
// router.put('/module/update/:id', upload.none(), moduleController.updateModule); // Use multer for form-data
// router.delete('/module/delete/:id',moduleController.deleteModule);


module.exports = router;