const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const HealthInsurance = sequelize.define('health_insurance', {
    branchcode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    member_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    orgno: {
        type: DataTypes.STRING,
        allowNull: true
    },
    orgmemno: {
        type: DataTypes.STRING,
        allowNull: true
    },
    enrolment_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    any_disease: {
        type: DataTypes.STRING,
        allowNull: true
    },
    insurance_policy_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    insurance_type_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    premium_amnt: {
        type: DataTypes.STRING,
        allowNull: true
    },
    insurance_tenure: {
        type: DataTypes.STRING,
        allowNull: true
    },
    insurance_policy_no: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nominee_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nomine_phone_no: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nominee_birthday: {
        type: DataTypes.DATE,
        allowNull: true
    },
    nominee_typeof_card_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nominee_card_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nominee_relation_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    erp_member_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    project_code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contact_no: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nominee_id_front: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nominee_id_back: {
        type: DataTypes.STRING,
        allowNull: true
    },
    card_issue_country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    card_issue_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    card_expiry_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    demarks: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'health_insurance'
});

// Add a static method to update the model
HealthInsurance.updateInsurance = async function (id, updatedData) {
    try {
        const record = await this.findByPk(id);
        if (!record) {
            throw new Error('Record not found');
        }
        await record.update(updatedData);
        return record;
    } catch (error) {
        throw error;
    }
};


// Sync the database
sequelize.sync({ force: false }) // Set force to true to drop and recreate tables on every sync
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Unable to create tables:', err);
    });


module.exports = HealthInsurance;
