const express = require('express');
const memberController = require('../controllers/memberController');

// const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


router.get('/member', memberController.getMembers);
// router.get('/member/branch/code', memberController.getMembers);


module.exports = router;

