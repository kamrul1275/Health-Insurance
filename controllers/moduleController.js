const express = require('express');
const router = express.Router();

const Module = require('../models/Module');
const User = require('../models/User');


const { Op } = require('sequelize');// Adjust the path as necessary
require('dotenv').config();


const modules = []; // This will act as our in-memory database for roles

// Get all roles
exports.getModules = async (req, res) => {
    try {
        const modules = await Module.findAll();
        res.status(200).json(modules);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }


};




exports.createModule = async (req, res) => {
    console.log("Request body:", req.body); // Verify what data is received

    const { moduleName, createBy, userId } = req.body;

    try {
        const user = await User.findByPk(createBy);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const module = await Module.create({ moduleName, createBy: user.id });

        res.status(201).json({
            message: 'Module created successfully',
            Module: {
                id: module.id,
                moduleName: module.moduleName,
                createdAt: module.createdAt,
                updatedAt: module.updatedAt,
                createBy: {
                    id: user.id,
                    name: user.name,
                },
            },
        });
    } catch (error) {
        console.error("Error creating module:", error);
        res.status(400).json({ error: error.message });
    }
};


// // Example of starting the server
// app.post('/create-role', exports.create);

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });


// Get a role by ID
// exports.getRoleById = async (req, res) => {
//     try {
//         const role = await Module.findByPk(req.params.id);
//         if (!role) return res.status(404).send('Role not found');
//         res.status(200).json(role);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//     }

// };

// // Update a role by ID
// exports.updateRole = async (req, res) => {
//     console.log("req.body", req.body);

//     try {
//         const role = await Module.findByPk(req.params.id);
//         if (!role) return res.status(404).send('Role not found');

//         // Update the role
//         role.roleName = req.body.roleName;
//         role.createBy = req.body.createBy;
//         await role.save();

//         res.status(200).json(role);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//     }

// };




// // Delete a role by ID
// exports.deleteRole = async (req, res) => {
//     try {
//         const role = await Role.findByPk(req.params.id);
//         if (!role) return res.status(404).json({ message: 'Role not found' });

//         await role.destroy();
//         res.status(200).json({ message: 'Role deleted successfully' });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//     }
// };