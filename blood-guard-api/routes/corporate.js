const express = require('express');
const router = express.Router();
const Joi = require('joi');
const models = require('../models');
const { sendCorporateCreatedEmail, sendCorporateStatusUpdateEmail } = require('../helpers/mailservice');
const { getCorporateRecords } = require('../controllers/corporate');

const corporateSchema = Joi.object({
  organization_id: Joi.number().integer().required(),
  corporate_company_name: Joi.string().required(),
  corporate_company_branch: Joi.string().required(),
  corporate_camp_name: Joi.string().required(),
  corporate_spoc_name: Joi.string().required(),
  corporate_spoc_designation: Joi.string().required(),
  corporate_email: Joi.string().email().required(),
  corporate_phone_number: Joi.string().required(),
  corporate_address_line_one: Joi.string().optional(),
  corporate_address_line_two: Joi.string().optional(),
  corporate_city: Joi.string().optional(),
  corporate_state: Joi.string().required(),
  corporate_zip_code: Joi.number().integer().required(),
  corporate_message: Joi.string().optional()
});

const getCorporateSchema = Joi.object({
    corporate_id: Joi.number().integer().optional(),
    organization_id: Joi.number().integer().optional(),
    support_status: Joi.string().valid('Pending', 'Approved', 'Rejected').optional(),
    corporate_email: Joi.string().email().optional(),
    corporate_camp_name: Joi.string().optional(),
});

router.post('/request-corporate', async (req, res) => {
  try {
    // Validate request body
    const { error } = corporateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { corporate_camp_name, organization_id } = req.body;

    // Check if the camp name is unique
    const existingCamp = await models.Corporate.findOne({ where: { corporate_camp_name } });
    if (existingCamp) {
      return res.status(400).json({ error: 'Corporate camp name already exists' });
    }

    // Create the corporate record
    const newCorporate = await models.Corporate.create({
      ...req.body,
      support_status: 'Pending',
      created_at: new Date(),
      updated_at: new Date()
    });

    // Fetch organization details
    const organization = await models.Organization.findByPk(organization_id);
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    // Send email notifications
    await sendCorporateCreatedEmail(newCorporate, organization);

    res.status(201).json({ message: 'Corporate record created successfully', data: newCorporate });
  } catch (error) {
    console.error('Error in creating corporate record:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.put('/statu-corporate/:id', async (req, res) => {
    const { id } = req.params;
    const { support_status, support_remarks } = req.body;
  
    try {
      // Validate input
      if (!['Pending', 'Approved', 'Rejected'].includes(support_status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
  
      // Find the corporate record
      const corporate = await models.Corporate.findByPk(id);
      if (!corporate) {
        return res.status(404).json({ error: 'Corporate record not found' });
      }
  
      // Update the status and remarks
      corporate.support_status = support_status;
      corporate.support_remarks = support_remarks;
      await corporate.save();
  
      // Send email notification to corporate
      await sendCorporateStatusUpdateEmail(corporate);
  
      res.status(200).json({ message: 'Corporate record updated successfully' });
    } catch (error) {
      console.error('Error updating corporate record:', error.message);
      res.status(500).json({ error: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const { error } = getCorporateSchema.validate(req.query);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const result = await getCorporateRecords(req.query);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching corporate records:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
