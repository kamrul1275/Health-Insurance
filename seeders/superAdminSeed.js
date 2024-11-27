'use strict';
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/User'); // Adjust the path as necessary

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const hashedPassword = await bcrypt.hash('yourSuperAdminPassword', 10); // Replace 'yourSuperAdminPassword' with the actual password

        await User.bulkCreate([
            {
                name: 'SuperAdmin',
                username: 'SuperAdmin',
                email: 'superadmin@gmail.com',
                password: hashedPassword,
                phone: '1234567890',
                role_type: 'superadmin',
                createdAt: new Date(),
                updatedAt: new Date(),
               
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await User.destroy({
            where: {
                email: 'superadmin@gmail.com'
            }
        });
    }
};