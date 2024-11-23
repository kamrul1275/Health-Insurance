const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RelationData = sequelize.define('relationdata', {
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
}, {
    timestamps: false
});

// sequelize.sync({ force: true })
//     .then(() => {
//         console.log('Relation table has been created.');
//     })
//     .catch(error => {
//         console.error('Unable to create table:', error);
//     });

module.exports = RelationData;