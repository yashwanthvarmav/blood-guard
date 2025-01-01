const models = require('../models');
const { Op } = require('sequelize');
const { sendBloodDonationRequestEmail } = require('../helpers/mailservice');

async function getEligibleDonorsController(req, res) {
  try {
    const {
      first_name,
      last_name,
      blood_group,
      email,
      city,
      state,
      country,
      zipcode
    } = req.query;

    // Filters for eligible users
    const filters = {
      eligibility: 'Eligible',
      deleted_at: null // Exclude soft-deleted records
    };

    // Add additional filters if provided
    if (first_name) filters.first_name = { [Op.iLike]: `%${first_name}%` };
    if (last_name) filters.last_name = { [Op.iLike]: `%${last_name}%` };
    if (blood_group) filters.blood_group = blood_group;
    if (email) filters.email = { [Op.iLike]: `%${email}%` };
    if (city) filters.home_city = { [Op.iLike]: `%${city}%` };
    if (state) filters.home_state = { [Op.iLike]: `%${state}%` };
    if (country) filters.home_country = { [Op.iLike]: `%${country}%` };
    if (zipcode) filters.home_zip_code = zipcode;

    // Query eligible users
    const eligibleUsers = await models.User.findAndCountAll({
      where: filters,
      attributes: [
        'id',
        'first_name',
        'last_name',
        'blood_group',
        'email',
        'home_city',
        'home_state',
        'home_country',
        'home_zip_code',
        'primary_phone_number'
      ],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      total: eligibleUsers.count,
      users: eligibleUsers.rows
    });
  } catch (error) {
    console.error('Error fetching eligible users:', error);
    res.status(500).json({ error: 'An error occurred while fetching eligible users' });
  }
}

async function requestBloodDonationController(req, res) {
    const { user_id, organization_id } = req.body;
  
    try {
      // Fetch the user details
      const user = await models.User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Fetch the organization details
      const organization = await models.Organization.findByPk(organization_id);
      if (!organization) {
        return res.status(404).json({ error: 'Organization not found' });
      }
  
      // Use the reusable email function
      await sendBloodDonationRequestEmail(user, organization);
  
      res.status(200).json({ message: 'Blood donation request email sent successfully' });
    } catch (error) {
      console.error('Error requesting blood donation:', error);
      res.status(500).json({ error: 'An error occurred while sending the blood donation request' });
    }
}

module.exports = {
  getEligibleDonorsController,
  requestBloodDonationController
};
