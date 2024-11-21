const express = require('express');
const router = express.Router();
const HealthInsurance = require('../models/HealthInsurance');
// const Member = require('../models/Member');

const { Op } = require('sequelize');// Adjust the path as necessary
require('dotenv').config();


 const health_insurances = []; // This will act as our in-memory database for roles

// Get all roles
exports.getHealthInsurance = async (req, res) => {
    try {
        const health_insurances = await HealthInsurance.findAll();
        res.status(200).json(health_insurances);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }

};// end getHealthInsurance




// Define the health_insurance function

// const HealthInsurance = require('../models/HealthInsurance'); // Adjust the path as necessary

exports.storeHealthInsurance = async (req, res) => {
    const { ApiKey, BranchCode, HealthInsuranceJson } = req.body;
    
    // Handle image file paths
    const nomineeImageFront = req.files && req.files['nomineeImageFront'] 
        ? req.files['nomineeImageFront'][0].path 
        : null;
    const nomineeImageBack = req.files && req.files['nomineeImageBack'] 
        ? req.files['nomineeImageBack'][0].path 
        : null;

    console.log("req.body...", req.body);
    console.log("req.files...", req.files);
    console.log("nomineeImageFront...", nomineeImageFront);
    console.log("nomineeImageBack...", nomineeImageBack);

    // Validate required fields
    if (!ApiKey || !BranchCode || !HealthInsuranceJson || !Array.isArray(HealthInsuranceJson)) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Iterate over each insurance data object
        for (const insuranceData of HealthInsuranceJson) {
            await HealthInsurance.create({
                branchcode: BranchCode,
                member_name: insuranceData.NomineeName,
                cono: insuranceData.CoNo,
                orgno: insuranceData.OrgNo,
                orgmemno: insuranceData.OrgMemNo,
                enrolment_id: insuranceData.EnrollId,
                any_disease: insuranceData.AnyDisese,
                insurance_policy_id: insuranceData.PolicyName,
                insurance_type_id: insuranceData.InsuranceType,
                category_id: insuranceData.Category,
                premium_amnt: insuranceData.PremiumAmount,
                insurance_tenure: insuranceData.Duration,
                insurance_policy_no: insuranceData.PolicyName,
                nominee_name: insuranceData.NomineeName,
                nomine_phone_no: insuranceData.NomineePhone,
                nominee_birthday: insuranceData.NomineeDOB,
                nominee_typeof_card_id: insuranceData.NomineeIDType,
                nominee_card_id: insuranceData.NomineeIDNumber,
                nominee_relation_id: insuranceData.NomineeRelation,
                status: 'active', // Assuming a default status
                erp_member_id: insuranceData.ErpMemId,
                project_code: insuranceData.ProjectCode,
                contact_no: insuranceData.Phone,
                nomineeImageFront: nomineeImageFront, // Path to the uploaded front image
                nomineeImageBack: nomineeImageBack, // Path to the uploaded back image
                card_issue_country: insuranceData.NomineeIDPlaceOfIssue,
                card_issue_date: insuranceData.NomineeIDIssueDate,
                card_expiry_date: insuranceData.NomineeIDExpiryDate,
                demarks: '' // Assuming no remarks provided
            });
        }

        // Send success response after inserting all items
        res.status(201).json({
            message: 'Health insurance data stored successfully',
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

