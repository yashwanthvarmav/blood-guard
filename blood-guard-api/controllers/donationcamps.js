const models = require('../models');
const { Op } = require('sequelize');

// Add Blood Donation Camp
async function addDonationCamp(req, res) {
  const {
    name,
    status,
    address_line_one,
    address_line_two,
    city,
    state,
    country,
    zipcode,
    phone_number,
    email,
    camp_type,
    start_date,
    end_date,
    open_timings,
    collaboration_with,
    organization_id
  } = req.body;

  // Check if the organization exists
  const organization = await models.Organization.findByPk(organization_id);
  if (!organization) {
    return res.status(404).json({ error: 'Organization not found' });
  }

  // Check if the name is already taken
  const existingCamp = await models.DonationCamp.findOne({
    where: { name }
  });
  if (existingCamp) {
    return res.status(400).json({ error: 'The camp name is already taken' });
  }

  // Create the new camp
  const newCamp = await models.DonationCamp.create({
    name,
    status,
    address_line_one,
    address_line_two,
    city,
    state,
    country,
    zipcode,
    phone_number,
    email,
    camp_type,
    start_date,
    end_date,
    open_timings,
    collaboration_with,
    organization_id
  });

  res.status(201).json({ message: 'Donation camp added successfully', newCamp });
}


// List Blood Donation Camps
async function listDonationCamps(req, res) {
  const { organization_id, camp_id, zipcode, city, state, camp_type, name, date, limit = 10, offset = 0 } = req.query;

  const filters = { deleted_at: null };
  if (organization_id) filters.organization_id = organization_id;
  if (camp_id) filters.id = camp_id;
  if (zipcode) filters.zipcode = zipcode;
  if (city) filters.city = { [Op.iLike]: `%${city}%` };
  if (state) filters.state = { [Op.iLike]: `%${state}%` };
  if (camp_type) filters.camp_type = camp_type;
  if (name) filters.name = { [Op.iLike]: `%${name}%` };

  // Filter for active camps and date-based search
  if (zipcode || city || state || camp_type || name || date) filters.status = 'ACTIVE';
  if (date) {
    filters[Op.or] = [
      { start_date: { [Op.lte]: date }, end_date: { [Op.gte]: date } },
      { start_date: date },
      { end_date: date }
    ];
  }

  const camps = await models.DonationCamp.findAndCountAll({
    where: filters,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['created_at', 'DESC']]
  });

  res.status(200).json({ total: camps.count, camps: camps.rows });
}

// Update Blood Donation Camp
async function updateDonationCamp(req, res) {
  const { id } = req.params;
  const updates = req.body;

  const restrictedFields = ['name', 'organization_id', 'type', 'camp_type'];
  for (const field of restrictedFields) {
    if (updates[field]) {
      return res.status(400).json({ error: `You cannot update the ${field} field` });
    }
  }

  const camp = await models.DonationCamp.findByPk(id);
  if (!camp || camp.deleted_at) {
    return res.status(404).json({ error: 'Donation camp not found' });
  }

  await camp.update(updates);

  res.status(200).json({ message: 'Donation camp updated successfully', camp });
}

// Remove Blood Donation Camp
async function removeDonationCamp(req, res) {
  const { id } = req.params;

  const camp = await models.DonationCamp.findByPk(id);
  if (!camp || camp.deleted_at) {
    return res.status(404).json({ error: 'Donation camp not found' });
  }

  await camp.update({ status: 'INACTIVE', deleted_at: new Date() });

  res.status(200).json({ message: 'Donation camp removed successfully' });
}

module.exports = {
  addDonationCamp,
  listDonationCamps,
  updateDonationCamp,
  removeDonationCamp
};
