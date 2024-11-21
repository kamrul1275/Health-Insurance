const express = require('express');
const router = express.Router();
const IdType = require('../models/IdType');
// const Member = require('../models/Member');


const { Op } = require('sequelize');// Adjust the path as necessary
require('dotenv').config();


// const idTypes = []; // This will act as our in-memory database for roles

// Get all Branch
exports.getIdTypes = async (req, res) => {
    try {
        const idTypes = await IdType.findAll({
            where: {
            data_type: 'cardTypeId'
            }
        });
        console.log(idTypes);

        res.status(200).json(idTypes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }


};