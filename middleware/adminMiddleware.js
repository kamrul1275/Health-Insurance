const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    console.log('Token:', token);
    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        console.log('Decoded:', decoded);
        req.user = decoded.user; // Correctly assign the user object
        next();
    } catch (ex) {
        console.error('Token verification failed:', ex.message);
        res.status(400).send({ error: 'Invalid token.' });
    }
};

const isAdmin = (req, res, next) => {
    console.log('User:', req.user.role_type); // Add this line to debug
    if (req.user.role_type !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

const isUser = (req, res, next) => {
    console.log('User:', req.user.role_type); // Add this line to debug
    if (req.user.role_type !== 'user') {
        return res.status(403).json({ message: 'Access denied. Users only.' });
    }
    next();
};

module.exports = {
    verifyToken,
    isAdmin,
    isUser
};