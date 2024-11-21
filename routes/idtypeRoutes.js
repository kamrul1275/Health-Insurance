const express = require('express');
const idtypeController = require('../controllers/idtypeController');

// const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


router.get('/idtype', idtypeController.getIdTypes);  
// router.get('/branch/:branch_code/member/name', branchController.getMemberNameByBranchCode);  // Updated route

module.exports = router;