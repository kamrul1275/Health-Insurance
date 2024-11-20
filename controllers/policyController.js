const express = require('express');
const router = express.Router();
// const Branch = require('../models/Branch');
const Policy = require('../models/Policy');


const { Op } = require('sequelize');// Adjust the path as necessary
require('dotenv').config();


const policies = []; // This will act as our in-memory database for roles

// Get all roles
exports.getPloicy = async (req, res) => {
    try {
        const policies = await Policy.findAll();
        res.status(200).json(policies);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }


};



