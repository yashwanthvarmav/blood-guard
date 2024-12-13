const models = require('../models');
const moment = require('moment');

// API-1: Get donations with filters
async function getDonations(req, res) {
  const {
    organization_id,
    donation_center_id,
    donation_camp_id,
    user_id,
    user_action,
    blood_donation_status,
    blood_donated_date,
    limit = 10,
    offset = 0,
  } = req.query;

  try {
    if (!organization_id) {
      return res.status(400).json({ error: 'Organization ID is mandatory' });
    }

    const whereCondition = { organization_id };

    if (donation_center_id) {
      whereCondition.donation_center_id = donation_center_id;
    }
    if (donation_camp_id) {
      whereCondition.donation_camp_id = donation_camp_id;
    }
    if (user_id) {
      whereCondition.user_id = user_id;
    }
    if (user_action) {
      whereCondition.user_action = user_action;
    }
    if (blood_donation_status) {
      whereCondition.blood_donation_status = blood_donation_status;
    }
    if (blood_donated_date) {
      whereCondition.blood_donated_date = blood_donated_date;
    }

    const donations = await models.Donation.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      total: donations.count,
      donations: donations.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// API-2: Add a new donation record
async function addDonation(req, res) {
  const {
    user_id,
    organization_id,
    donation_center_id,
    donation_camp_id,
    user_action,
    blood_donation_status,
  } = req.body;

  try {
    if (!user_id || !organization_id) {
      return res
        .status(400)
        .json({ error: 'User ID and Organization ID are mandatory' });
    }

    if (!donation_center_id && !donation_camp_id) {
      return res.status(400).json({
        error: 'Either Donation Center ID or Donation Camp ID must be provided',
      });
    }

    const newDonation = await models.Donation.create({
      user_id,
      organization_id,
      donation_center_id,
      donation_camp_id,
      user_action,
      blood_donation_status,
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(201).json({
      message: 'Donation record added successfully',
      newDonation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// API-3: Update an existing donation record
async function updateDonation(req, res) {
  const { id } = req.params;
  const { user_action, blood_donation_status, user_id } = req.body;

  try {
    const donation = await models.Donation.findByPk(id);

    if (!donation) {
      return res.status(404).json({ error: 'Donation record not found' });
    }

    // const updatedDonation = await donation.update({
    //   user_action: user_action || donation.user_action,
    //   blood_donation_status: blood_donation_status || donation.blood_donation_status,
    //   blood_donated_date: blood_donated_date || donation.blood_donated_date,
    //   updated_at: new Date(),
    // });

    const updatedDonation = await donation.update({
      user_action: user_action || donation.user_action,
      blood_donation_status: blood_donation_status || donation.blood_donation_status,
      blood_donated_date: blood_donation_status === "Completed" ? new Date() : donation.blood_donated_date,
      updated_at: new Date(),
    });    

    if (blood_donation_status === 'Completed') {
      const answers = {
        "question_one": true,
        "question_two": true,
        "question_three": true,
        "question_four": true,
        "question_five": false,
        "question_six": false,
        "question_seven": false,
        "question_eight": false,
        "question_nine": false,
        "question_ten": false,
        "question_eleven": false,
        "question_twelve": false,
        "question_thirteen": false,
        "question_fourteen": false,
        "question_fifteen": false,
        "question_sixteen": false,
        "question_seventeen": false,
        "question_eighteen": false,
        "question_nineteen": false,
        "question_twenty": false
      };
      const eligibility = 'Temporary Disqualification';
      const disqualification_type = 'question_three: Recent blood donation';
      const tempEndDate = moment().add(3, 'months').toDate();
  
      // Recreation of  eligibility status and answers in the database after donation
      await models.EligibilityStatus.create({
        user_id,
        eligibility,
        disqualification_type,
        disqualification_end_date : tempEndDate,
        next_eligibility_check : tempEndDate,
        ...answers
      });
  
      // Update the User table with the eligibility status
      await models.User.update(
        {
            eligibility,
            disqualification_type,
            next_eligibility_check : tempEndDate,
            updated_at: new Date() // Automatically set the updated_at timestamp
        },
        {
            where: { id: user_id } // Update based on the user_id
        }
      );
    }

    res.status(200).json({
      message: 'Donation record updated successfully',
      updatedDonation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// API-4: Soft delete a donation record
async function deleteDonation(req, res) {
  const { id } = req.params;

  try {
    const donation = await models.Donation.findByPk(id);

    if (!donation) {
      return res.status(404).json({ error: 'Donation record not found' });
    }

    await donation.update({
      deleted_at: new Date(),
    });

    res.status(200).json({ message: 'Donation record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getDonations,
  addDonation,
  updateDonation,
  deleteDonation,
};
