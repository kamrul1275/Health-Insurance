'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Module = require('../models/Module'); // Adjust the path as necessary

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await Module.bulkCreate([
            {
                moduleName: 'Module One', // You can modify this as needed
                createby: 'Admin', // You can modify this as needed
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                moduleName: 'Module Two',
                createby: 'Admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                moduleName: 'Module Three',
                createby: 'Admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await Module.destroy({
            where: {
                moduleName: ['Category One', 'Category Two', 'Category Three'],
            },
        });
    }
};