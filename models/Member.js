const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Member = sequelize.define('members', {
    member_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact_no: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^\d{10}$/,  // Regex for a 10-digit number
                msg: "Contact number must be exactly 10 digits."
            },
            notEmpty: {
                msg: "Contact number cannot be empty."
            }
        }
    },
    nomine_gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['male:1', 'female:0']],  // Valid options for gender
                msg: "Nominee gender must be one of the following: Male=1, Female=0."
            },
            notEmpty: {
                msg: "Nominee gender cannot be empty."
            }
        }
    },
    date_birthday: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    branch_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Branch',  // Use the table name as a string to avoid circular dependency
            key: 'id'
        }
    }
}, {
    timestamps: false,  // Disable timestamps
});

// create database table

// sequelize.sync({ force: true })
//     .then(() => {
//         console.log('Category table has been created.');
//     })
//     .catch(error => {
//         console.error('Unable to create table:', error);
//     });

module.exports = Member;