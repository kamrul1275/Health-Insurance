const sequelize = require('../config/db');
const User = require('./User');
const Role = require('./Role');

// Initialize models
const models = {
    User: User,
    Role: Role
};

// Call associate methods
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Sync the models with the database
// sequelize.sync({ force: true })  // Use { force: true } to drop and recreate tables
//     .then(() => {
//         console.log('Tables have been created.');
//     })
//     .catch(error => {
//         console.error('Unable to create tables: ', error.message);
//         console.error('Stack trace:', error.stack);
//         process.exit(1);  // Exit the process with an error code
//     });

module.exports = models;