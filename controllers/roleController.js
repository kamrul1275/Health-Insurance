const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Role = require('../models/Role');

const { Op } = require('sequelize');// Adjust the path as necessary
require('dotenv').config();


const roles = []; // This will act as our in-memory database for roles

// Get all roles
exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }


};




// Create a new role
exports.create = async (req, res) => {
    const { roleName, userId } = req.body;
    console.log("roleName ...", roleName);
    try {
        const role = await Role.create({ roleName, userId }); // Include userId
        res.status(201).json({

            message: 'Role created successfully',
            Role: role
        }); // Include role
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};


// Get a role by ID
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) return res.status(404).send('Role not found');
        res.status(200).json(role);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }

};

// Update a role by ID
exports.updateRole = async (req, res) => {

    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) return res.status(404).send('Role not found');

        // Update the role
        role.roleName = req.body.roleName;
        role.userId = req.body.userId;
        await role.save();

        res.status(200).json(role);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }

};

// Delete a role by ID
exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ message: 'Role not found' });

        await role.destroy();
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};