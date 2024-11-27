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




exports.create = async (req, res) => {
    console.log("Request body:", req.body); // Verify what data is received

    const { roleName, createBy, userId } = req.body;

    try {
        const user = await User.findByPk(createBy);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const role = await Role.create({ roleName, createBy: user.id });

        res.status(201).json({
            message: 'Role created successfully',
            Role: {
                id: role.id,
                roleName: role.roleName,
                createdAt: role.createdAt,
                updatedAt: role.updatedAt,
                createBy: {
                    id: user.id,
                    name: user.name,
                },
            },
        });
    } catch (error) {
        console.error("Error creating role:", error);
        res.status(400).json({ error: error.message });
    }
};


// // Example of starting the server
// app.post('/create-role', exports.create);

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });


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
    console.log("req.body", req.body);

    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) return res.status(404).send('Role not found');

        // Update the role
        role.roleName = req.body.roleName;
        role.createBy = req.body.createBy;
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