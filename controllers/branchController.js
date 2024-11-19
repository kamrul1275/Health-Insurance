const express = require('express');
const router = express.Router();
const Branch = require('../models/Branch');
const Member = require('../models/Member');


const { Op } = require('sequelize');// Adjust the path as necessary
require('dotenv').config();


const roles = []; // This will act as our in-memory database for roles

// Get all Branch
exports.getBranchs = async (req, res) => {
    try {
        // const branchs = await Branch.findAll();
        const branchs = await Branch.findAll({
            include: [{
            model: Member,
            attributes: ['member_name']
            }]
        });
        res.status(200).json(branchs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }


};

// Get all Member Name


// Get all Branches with Member Names

// Get Branches by branch_code with Member Names
exports.getMemberNameByBranchCode = async (req, res) => {
    const { branch_code } = req.params;  // Get branch_code from request parameters

    try {
        const branches = await Branch.findAll({
            where: { branch_code },  // Filter by branch_code
            include: [{
                model: Member,
                attributes: ['member_name']  // Only include the member_name attribute
            }]
        });

        if (branches.length === 0) {
            return res.status(404).json({ message: 'No branches found with the specified branch_code' });
        }

        res.status(200).json(branches);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};


