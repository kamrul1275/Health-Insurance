const express = require('express');
const router = express.Router();
const IdType = require('../models/IdType');
const { Op } = require('sequelize');

require('dotenv').config();


// const idTypes = []; // This will act as our in-memory database for roles

// Get all Branch

async function getIdTypes(req, res) {
    try {
        const idTypes = await IdType.findAll({
            attributes: ['data_id', 'data_name', 'issue_date', 'exp_date'],
            where: {
                data_type: 'cardTypeId',
                data_name: {
                    [Op.in]: ['Passport', 'National ID']
                }
            }
        });
        res.status(200).json(idTypes);
    } catch (error) {
        console.error('Error fetching IdTypes:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getIdTypes };