const express = require('express');
const router = express.Router();
const Permission = require('../models/Permission');

const { Op } = require('sequelize');// Adjust the path as necessary
require('dotenv').config();


const roles = []; // This will act as our in-memory database for roles

// Get all roles
exports.getPermissions = async (req, res) => {
    try {
        const Permissions = await Permission.findAll();
        res.status(200).json(Permissions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }


};




// Create a new permission
exports.createPermission = async (req, res) => {
    const { permissionName } = req.body;
    console.log("permissionName ...", permissionName);
    try {
        const permission = await Permission.create({ permissionName }); // Include userId
        res.status(201).json({

            message: 'Permission created successfully',
            permissionName: permission
        }); // Include role
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};


// Get a role by ID
exports.getPermissionById = async (req, res) => {
    try {
        const permission = await Permission.findByPk(req.params.id);
        if (!permission) return res.status(404).send('Permission not found');
        res.status(200).json(permission);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }

};

// Update a role by ID
exports.updatePermission = async (req, res) => {

    try {
        const permission = await Permission.findByPk(req.params.id);
        if (!permission) return res.status(404).send('Permission not found');

        // Update the role
        permission.permissionName = req.body.permissionName;
        await permission.save();

        res.status(200).json(permission);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }

};

// Delete a role by ID
exports.deletePermission = async (req, res) => {
    try {
        const permission = await Permission.findByPk(req.params.id);
        if (!permission) return res.status(404).json({ message: 'Permission not found' });

        await permission.destroy();
        res.status(200).json({ message: 'Permission deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};