const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const IdType = sequelize.define('idtypes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    issue_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    exp_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    issue_place: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false
});

// sequelize.sync({ force: true })
//     .then(() => {
//         console.log('IdType table has been created.');
//     })
//     .catch(error => {
//         console.error('Unable to create table:', error);
//     });

module.exports = IdType;