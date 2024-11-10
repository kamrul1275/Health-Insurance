const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }

    // New field to store the user's token

}, {
    timestamps: true,  // Enable timestamps
});

// Define relationships
// Define associations
Role.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Role, { foreignKey: 'userId' });

// Sync the model with the database
// sequelize.sync()
//     .then(() => {
//         console.log('Role table has been created.');
//     })
//     .catch(error => {
//         console.error('Unable to create table : ', error);
//     });

module.exports = Role;