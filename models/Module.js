
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Module = sequelize.define('Module', {
    moduleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    createBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',  // Use the table name as a string to avoid circular dependency
            key: 'id'
        }
    }
}, {
    timestamps: true,  // Enable timestamps
});


User.hasMany(Module, { foreignKey: 'CreateBy' });
Module.belongsTo(User, { foreignKey: 'CreateBy' });




// sequelize.sync()
//     .then(() => {
//         console.log('Module table has been created.');
//     })
//     .catch(error => {
//         console.error('Unable to create table : ', error);
//     });

module.exports = Module;





// Sync the model with the database
// sequelize.sync()
//     .then(() => {
//         console.log('Module table has been created.');
//     })
//     .catch(error => {
//         console.error('Unable to create table : ', error);
//     });

