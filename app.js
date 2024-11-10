const express = require('express');
const { Pool } = require('pg');
// const authRoute = require('./routes/authRoutes');

const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');
const roleRoute = require('./routes/roleRoutes');
const permissionRoute = require('./routes/permissionRoutes');


const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const app = express();
const port = process.env.PORT || 3000;

const sequelize = require('./config/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.none()); // To handle form-data


// User Authentication
app.use('/api/auth', authRoute);

// user routes
app.use('/api', userRoute);


//role routes
app.use('/api', roleRoute);

// permission routes
app.use('/api', permissionRoute);



// Start server
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Handle EADDRINUSE error
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please use a different port.`);
        process.exit(1);
    } else {
        throw error;
    }
});