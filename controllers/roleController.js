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

// // Get all roles
// exports.getRoles = async (req, res) => {
//     try {
//         const roles = await Role.findAll({
//             include: {
//                 model: User,
//                 as: 'createByUser', // Alias for the association
//                 attributes: ['id', 'username'] // Assuming the User model has an 'id' and 'username' field
//             }
//         });
//         res.status(200).json(roles);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//     }
// };





// Create a new role
// exports.create = async (req, res) => {
//     const { roleName, userId } = req.body;
//     console.log("roleName ...", roleName);
//     try {
//         const role = await Role.create({ roleName, userId }); // Include userId
//         res.status(201).json({

//             message: 'Role created successfully',
//             Role: role
//         }); // Include role
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ error: error.message });
//     }
// };


// Create a new role
exports.create = async (req, res) => {
    const { roleName, createBy, userId } = req.body;
    console.log("body check ...", roleName, createBy);
    try {
        // Fetch the user by userId
        const user = await User.findByPk(createBy);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create the role with createBy field set to userId
        const role = await Role.create({ roleName, createBy: user.id });


        res.status(201).json({
            message: 'Role created successfully',
            Role: {
                id: role.id,
                roleName: role.roleName,
                createdAt: role.createdAt,
                updatedAt: role.updatedAt,
                creatBy: {
                    id: user.id,
                    name: user.name // Assuming the User model has a username field
                }
            }
        });
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