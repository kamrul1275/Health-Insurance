const express = require('express');
const { Pool } = require('pg');
const sequelize = require('./config/db'); // Adjust the path as necessary
const User = require('./models/User'); // Adjust the path as necessary
const Role = require('./models/Role'); // Adjust the path as necessary
const { Branch, Member } = require('./models/associations');  // Import associations

const app = express();
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



// Start the server

// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});