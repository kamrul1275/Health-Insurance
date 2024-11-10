const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// const Role = require('./Role');

const Permission = sequelize.define('Permission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    permissionName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    // roleId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: Role,
    //         key: 'id'
    //     }
    // }


}, {
    timestamps: true,  // Enable timestamps
});

// Define relationships
// Permission.belongsTo(Role, { foreignKey: 'roleId' });
// Role.hasMany(Permission, { foreignKey: 'roleId' });

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('Permission table has been created.');
    })
    .catch(error => {
        console.error('Unable to create table : ', error);
    });

module.exports = Permission;