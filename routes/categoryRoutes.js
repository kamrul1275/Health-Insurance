const express = require('express');
const categoryController = require('../controllers/categoryController');

// const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


router.get('/category', categoryController.getCategory);  
// router.get('/category/:policy_id', categoryController.getCategoryWithPolicyId);

// Updated route for getCategoryWithPolicyId
// router.get('/category/:policy_id', categoryController.getCategoryWithPolicyId);
router.get('/category/:policy_id', categoryController.getCategoryWithPolicyId);

module.exports = router;