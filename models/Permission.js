const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = require('./Role');
const Module = require('./Module');
const User = require('./User');


const Permission = sequelize.define('Permission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    canCreate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false,
    },
    canGetList: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false,
    },
    canGetOne: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false,
    },

    canUpdate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false,
    },
    canDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false,
    },
    createBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },


    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'id'
        }
    },

    moduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Module,
            key: 'id'
        }
    },

}, {
    timestamps: true,  // Enable timestamps
});

// Permission model
Permission.belongsTo(Module, { as: 'module', foreignKey: 'moduleId' });
Permission.belongsTo(Role, { as: 'role', foreignKey: 'roleId' });
Permission.belongsTo(User, { as: 'createByUser', foreignKey: 'createBy' });

// Module model
Module.hasMany(Permission, { as: 'permissions', foreignKey: 'moduleId' });

// Role model
Role.hasMany(Permission, { as: 'permissions', foreignKey: 'roleId' });

// User model
User.hasMany(Permission, { as: 'createdPermissions', foreignKey: 'createBy' });



// Sync the model with the database
// sequelize.sync()
//     .then(() => {
//         console.log('Permission table has been created.');
//     })
//     .catch(error => {
//         console.error('Unable to create table : ', error);
//     });

module.exports = Permission;