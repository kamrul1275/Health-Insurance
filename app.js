const express = require('express');
const { Pool } = require('pg');
const sequelize = require('./config/db'); // Adjust the path as necessary
const User = require('./models/User'); // Adjust the path as necessary
const Role = require('./models/Role'); // Adjust the path as necessary
const app = express();
const PORT = process.env.PORT || 3000;

// Define associations
User.associate({ Role });
Role.associate({ User });
// const authRoute = require('./routes/authRoutes');

const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');
const roleRoute = require('./routes/roleRoutes');
const permissionRoute = require('./routes/permissionRoutes');


const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();


// const sequelize = require('./config/db');

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



// Sync the database
sequelize.sync({ force: false }) // Set force to true to drop and recreate tables on every sync
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Unable to create tables:', err);
    });

// Start the server

// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});