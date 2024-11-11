const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = require('./Role');
const Module = require('./Module');


const Permission = sequelize.define('Permission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    canCreate: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    canGetList: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    canGetOne: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    canUpdate: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    canDelete: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    creatby: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
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

Role.hasMany(Permission, { foreignKey: 'roleId' });
Permission.belongsTo(Role, { foreignKey: 'roleId' });

Module.hasMany(Permission, { foreignKey: 'moduleId' });
Permission.belongsTo(Module, { foreignKey: 'moduleId' });




// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('Permission table has been created.');
    })
    .catch(error => {
        console.error('Unable to create table : ', error);
    });

module.exports = Permission;