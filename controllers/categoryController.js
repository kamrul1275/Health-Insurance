const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Policy = require('../models/Policy');



const { Op } = require('sequelize');// Adjust the path as necessary
require('dotenv').config();


const categories = []; // This will act as our in-memory database for roles

// Get all roles



exports.getCategory = async (req, res) => {
    try {
        const categories = await Category.findAll({
            attributes: ['id', 'title', 'insurance', 'premium_installment', 'policy_tenure'],
            include: [{
                model: Policy,
                attributes: ['product_id', 'product_name'],
                required: false // This will create a LEFT JOIN
            }]
        });
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};