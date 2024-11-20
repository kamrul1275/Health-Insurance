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
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Category',
            key: 'id'
        }
    }
}, {
    timestamps: false
});

module.exports = Policy;