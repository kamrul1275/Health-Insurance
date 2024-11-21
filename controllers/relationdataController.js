const express = require('express');
const router = express.Router();
const RelationData = require('../models/RelationData');
// const Member = require('../models/Member');


const { Op } = require('sequelize');// Adjust the path as necessary
require('dotenv').config();


// const idTypes = []; // This will act as our in-memory database for roles

// Get all Branch
exports.getRelationData = async (req, res) => {
    try {
        const relationdata = await RelationData.findAll({
            where: {
            data_type: 'relationshipId'
            }
        });
        console.log(relationdata);

        res.status(200).json(relationdata);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }


};