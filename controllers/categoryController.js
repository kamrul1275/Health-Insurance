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
            attributes: ['id', 'title', 'premium_ammount_total', 'insurance_product_id', 'premium_installment',
                'policy_tenure', 'policy_name', 'policy_id'],
            include: [{
                model: Policy,
                attributes: ['product_id', 'product_name'], // Assuming 'id' is the correct column name
                required: false // This will create a LEFT JOIN
            }]
        });
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};//end method




exports.getCategoryWithPolicyId = async (req, res) => {
    const { policy_id } = req.params; // Extract policy_id from req.params
    console.log("policy_id", policy_id);

    const whereClause = policy_id ? { policy_id } : {};

    try {
        const categories = await Category.findAll({
            where: whereClause,
            attributes: ['id', 'title', 'premium_ammount_total', 'insurance_product_id', 'premium_installment',
                'policy_tenure', 'policy_name', 'policy_id'],
            include: [{
                model: Policy,
                attributes: ['product_id', 'product_name'], // Correctly reference the attributes
                required: false // This will create a LEFT JOIN
            }]
        });
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};