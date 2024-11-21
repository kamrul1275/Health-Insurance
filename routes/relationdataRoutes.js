const express = require('express');
const relationdataController = require('../controllers/relationdataController');

// const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


router.get('/relationdata', relationdataController.getRelationData);  
// router.get('/branch/:branch_code/member/name', branchController.getMemberNameByBranchCode);  // Updated route

module.exports = router;