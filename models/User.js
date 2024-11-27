const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_type: {
        type: DataTypes.ENUM('admin', 'user', 'guest','superadmin'),
        allowNull: false,
        defaultValue: 'user'
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Roles',  // Use the table name as a string to avoid circular dependency
            key: 'id'
        }
    }
}, {
    timestamps: true,  // Enable timestamps
});

// Define associations in a function
User.associate = function (models) {
    User.belongsTo(models.Role, { foreignKey: 'roleId' });
    models.Role.hasMany(User, { foreignKey: 'roleId' });
};


// create database table

// sequelize.sync({ force: true })
//     .then(() => {
//         console.log('User table has been created.');
//     })
//     .catch(error => {
//         console.error('Unable to create table:', error);
//     });


module.exports = User;