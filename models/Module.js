
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Module = sequelize.define('Module', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    moduleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // createBy: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    //     references: {
    //         model: 'Users',  // Use the table name as a string to avoid circular dependency
    //         key: 'id'
    //     }
    // }
}, {
    timestamps: true,  // Enable timestamps
});


// create database table

Module.belongsTo(User, { foreignKey: 'CreateBy' });




// sequelize.sync()
//     .then(() => {
//         console.log('Module table has been created.');
//     })
//     .catch(error => {
//         console.error('Unable to create table : ', error);
//     });

module.exports = Module;



