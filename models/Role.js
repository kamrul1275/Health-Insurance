const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = sequelize.define('Role', {
    roleName: {
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

// Define associations in a function
Role.associate = function (models) {
    Role.belongsTo(models.User, { foreignKey: 'createBy' });
    models.User.hasMany(Role, { foreignKey: 'createBy' });
};

module.exports = Role;