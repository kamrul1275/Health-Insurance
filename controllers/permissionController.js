const express = require('express');
const router = express.Router();
const Permission = require('../models/Permission');

const Module = require('../models/Module');
const User = require('../models/User');
const Role = require('../models/Role');

const { Op } = require('sequelize');// Adjust the path as necessary
// const Module = require('../models/Module');
require('dotenv').config();


const roles = []; // This will act as our in-memory database for roles

// Get all permission

exports.getPermissions = async (req, res) => {
    try {
        const permissions = await Permission.findAll({
            include: [
                {
                    model: Module,
                    as: 'module',
                    attributes: ['moduleName'] // Adjust the attribute name as per your Module model
                },
                {
                    model: Role,
                    as: 'role',
                    attributes: ['roleName'] // Adjust the attribute name as per your Role model
                },
                {
                    model: User,
                    as: 'createByUser',
                    attributes: ['name'] // Adjust the attribute name as per your User model
                }
            ]
        });
        res.status(200).json(permissions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};




// Create a new permission
exports.createPermission = async (req, res) => {
    const { canCreate, canGetList, canGetOne, canUpdate, canDelete, createBy, roleId, moduleId } = req.body;
    console.log("Creating permission with data:", req.body);
    try {
        const permission = await Permission.create({
            canCreate,
            canGetList,
            canGetOne,
            canUpdate,
            canDelete,
            createBy,
            roleId,
            moduleId
        });
        res.status(201).json({
            message: 'Permission created successfully',
            permission
        });
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