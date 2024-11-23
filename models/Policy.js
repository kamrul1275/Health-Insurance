const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Policy = sequelize.define('policies', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false
});


// create database table

// sequelize.sync({ force: true })
//     .then(() => {
//         console.log('Policy table has been created.');
//     })
//     .catch(error => {
//         console.error('Unable to create table:', error);
//     });

module.exports = Policy;