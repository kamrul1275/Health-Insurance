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

module.exports = Branch;