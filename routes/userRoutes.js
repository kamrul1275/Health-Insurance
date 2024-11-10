const express = require('express');
const { verifyToken, isAdmin, isUser } = require('../middleware/adminMiddleware');

const router = express.Router();

// Example of a protected route for all authenticated users
router.get('/profile', verifyToken, (req, res) => {
    res.json({ user: req.user });
});

// Admin-only route
router.get('/admin', verifyToken, isAdmin, (req, res) => {
    res.json({ message: 'Welcome Admin' });
});

// User-only route
router.get('/user/all', verifyToken, isUser, (req, res) => {
    res.json({ message: 'Welcome User' });
});

module.exports = router;