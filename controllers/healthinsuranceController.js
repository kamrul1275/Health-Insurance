const express = require('express');
const router = express.Router();
const multer = require('multer');
const HealthInsurance = require('../models/HealthInsurance');
const { Op } = require('sequelize');// Adjust the path as necessary
require('dotenv').config();




// Middleware to parse JSON and form data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for file handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads"); // Save files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file
    },
});

const upload = multer({ storage: storage });


 const health_insurances = []; // This will act as our in-memory database for roles

// Get all Health Insurance data
exports.getHealthInsurance = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const offset = (page - 1) * limit;
        const health_insurances = await HealthInsurance.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        const totalItems = await HealthInsurance.count();
        const totalPages = Math.ceil(totalItems / limit);

        res.status(200).json({
            data: health_insurances,
            pagination: {
                totalItems,
                totalPages,
                currentPage: parseInt(page),
                itemsPerPage: parseInt(limit)
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.storeHealthInsurance = async (req, res) => {
    try {
        const {
            ApiKey,
            BranchCode,
            Member_name,
            HealthInsuranceJson,
        } = req.body;

        // Debug uploaded files
        console.log("Uploaded files:", req.files);

        // Files uploaded
        const nomineeImageFront = req.files.nomineeImageFront
            ? req.files.nomineeImageFront[0] // Get the file object directly
            : null;
        const nomineeImageBack = req.files.nomineeImageBack
            ? req.files.nomineeImageBack[0] // Get the file object directly
            : null;

        // Log file buffers only if they exist
        if (nomineeImageFront) {
            console.log("Front Image Size:", nomineeImageFront.size);
        } else {
            console.log("No Front Image Uploaded");
        }

        if (nomineeImageBack) {
            console.log("Back Image Size:", nomineeImageBack.size);
        } else {
            console.log("No Back Image Uploaded");
        }

        // Parse the JSON string
        const healthInsuranceData = JSON.parse(HealthInsuranceJson);

        // Iterate over the HealthInsuranceJson array and insert each entry
        const healthInsuranceRecords = await Promise.all(
            healthInsuranceData.map(async (data) => {
                return HealthInsurance.create({
                    branchcode: BranchCode,
                    member_name: Member_name,
                    cono: data.CoNo,
                    orgno: data.OrgNo,
                    orgmemno: data.OrgMemNo,
                    enrolment_id: data.EnrollId,
                    any_disease: data.AnyDisese,
                    insurance_policy_id: data.PolicyName,
                    insurance_type_id: data.InsuranceType,
                    category_id: data.Category,
                    premium_amnt: data.PremiumAmount,
                    insurance_tenure: data.Duration,
                    nominee_name: data.NomineeName,
                    nomine_phone_no: data.NomineePhone,
                    nominee_birthday: data.NomineeDOB,
                    nominee_typeof_card_id: data.NomineeIDType,
                    nominee_card_id: data.NomineeIDNumber,
                    nominee_relation_id: data.NomineeRelation,
                    erp_member_id: data.ErpMemId,
                    project_code: data.ProjectCode,
                    contact_no: data.Phone,
                    nominee_id_front: nomineeImageFront ? nomineeImageFront.buffer : null, // Save image buffer
                    nominee_id_back: nomineeImageBack ? nomineeImageBack.buffer : null, // Save image buffer
                    card_issue_country: data.NomineeIDPlaceOfIssue,
                    card_issue_date: data.NomineeIDIssueDate,
                    card_expiry_date: data.NomineeIDExpiryDate,
                });
            })
        );

        // Respond to the client
        res.status(201).json({
            message: "Health insurance data stored successfully",
            records: healthInsuranceRecords,
        });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "Server error", error });
    }
};