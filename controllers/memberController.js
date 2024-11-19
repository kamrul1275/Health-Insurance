const express = require('express');
const router = express.Router();
const Branch = require('../models/Branch');
const Member = require('../models/Member');

const { Op } = require('sequelize');// Adjust the path as necessary
require('dotenv').config();


const members = []; // This will act as our in-memory database for roles

// Get all roles
exports.getMembers = async (req, res) => {
    try {
        const members = await Member.findAll();
        res.status(200).json(members);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }


};

