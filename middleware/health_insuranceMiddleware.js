// // health_insuranceMiddleware.js

// const healthInsuranceMiddleware = (req, res, next) => {
//     // Middleware logic here
//     console.log('Health Insurance Middleware triggered');
    
//     // Example: Check if user is authenticated
//     if (!req.isAuthenticated()) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     // Example: Check if user has health insurance
//     if (!req.user.hasHealthInsurance) {
//         return res.status(403).json({ message: 'Forbidden: No Health Insurance' });
//     }

//     // Proceed to the next middleware or route handler
//     next();
// };

// module.exports = healthInsuranceMiddleware;