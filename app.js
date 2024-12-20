const express = require('express');
const { Pool } = require('pg');
const sequelize = require('./config/db'); // Adjust the path as necessary
const User = require('./models/User'); // Adjust the path as necessary
const Role = require('./models/Role'); // Adjust the path as necessary
const { Branch, Member } = require('./models/associations');  // Import associations
const path = require("path");
const multer = require('multer');
const bodyParser = require("body-parser");

const app = express();
// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




const cors = require("cors");
app.use(cors());  // This allows all origins
const PORT = process.env.PORT || 3000;

// Define associations
User.associate({ Role });
Role.associate({ User });
// const authRoute = require('./routes/authRoutes');

const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');
const roleRoute = require('./routes/roleRoutes');
const permissionRoute = require('./routes/permissionRoutes');
const branchRoute = require('./routes/branchRoutes');
const memberRoute = require('./routes/memberRoutes');
const policyRoute = require('./routes/policyRoutes');
const categoryRoute = require('./routes/categoryRoutes');
const idtypeRoutes = require('./routes/idtypeRoutes');
const relationdataRoutes = require('./routes/relationdataRoutes');
const healthInsuranceRoute = require('./routes/healthInsuranceRoutes');
const moduleRoutes = require('./routes/moduleRoutes');







app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// User Authentication
app.use('/api/auth', authRoute);

// user routes
app.use('/api', userRoute);


//role routes
app.use('/api', roleRoute);

// permission routes
app.use('/api', permissionRoute);

app.use('/api', branchRoute);

app.use('/api', memberRoute);
app.use('/api', policyRoute);
app.use('/api', categoryRoute);

// IdTypen Routes
app.use('/api', idtypeRoutes);   


// Relation Routes
app.use('/api', relationdataRoutes);

//Health Insurance 
app.use('/api', healthInsuranceRoute);

// Module Routes
app.use('/api', moduleRoutes);



// Start the server
// sequelize.sync({ force: true })
//     .then(() => {
//         console.log(' table has been created.');
//     })
//     .catch(error => {
//         console.error('Unable to create table:', error);
//     });

// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});