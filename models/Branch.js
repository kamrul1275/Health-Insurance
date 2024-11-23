const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Branch = sequelize.define('branches', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    branch_code: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});



// create database table

// sequelize.sync({ force: true })
//     .then(() => {
//         console.log('Branch table has been created.');
//     })
//     .catch(error => {
//         console.error('Unable to create table:', error);
//     });


module.exports = Branch;