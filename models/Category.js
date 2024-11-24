const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    premium_ammount_total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    insurance_product_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    premium_installment: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    policy_tenure: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    policy_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    policy_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Policy',
            key: 'product_id'
        }
    }
}, {
    timestamps: false
});



module.exports = Category;