
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Module = sequelize.define('Module', {
    moduleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    creatby: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
}, {
    timestamps: true,  // Enable timestamps
});

sequelize.sync()
    .then(() => {
        console.log('Module table has been created.');
    })
    .catch(error => {
        console.error('Unable to create table : ', error);
    });

module.exports = Module;





// Sync the model with the database
// sequelize.sync()
//     .then(() => {
//         console.log('Role table has been created.');
//     })
//     .catch(error => {
//         console.error('Unable to create table : ', error);
//     });

