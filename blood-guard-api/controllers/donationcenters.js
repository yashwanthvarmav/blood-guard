const models = require('../models');
const { Op } = require('sequelize');

// Add Blood Donation Center
async function addDonationCenter(req, res) {
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
    type,
    organization_type,
    open_timings,
    holiday_timings,
    open_weekly_days,
    organization_id
  } = req.body;

  // Check if the organization exists
  const organization = await models.Organization.findByPk(organization_id);
  if (!organization) {
    return res.status(404).json({ error: 'Organization not found' });
  }

  // Check if the name is already taken
  const existingCenter = await models.DonationCenter.findOne({
    where: { name }
  });
  if (existingCenter) {
    return res.status(400).json({ error: 'The center name is already taken' });
  }

  // Create the new center
  const newCenter = await models.DonationCenter.create({
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
    type,
    organization_type,
    open_timings,
    holiday_timings,
    open_weekly_days,
    organization_id
  });

  res.status(201).json({ message: 'Donation center added successfully', newCenter });
}

// List Blood Donation Centers
async function listDonationCenters(req, res) {
  const { organization_id, center_id, zipcode, city, state, organization_type, name, limit = 10, offset = 0 } = req.query;

  const filters = { deleted_at: null };
  if (organization_id) filters.organization_id = organization_id;
  if (center_id) filters.id = center_id;
  if (zipcode) filters.zipcode = zipcode;
  if (city) filters.city = { [Op.iLike]: `%${city}%` };
  if (state) filters.state = { [Op.iLike]: `%${state}%` };
  if (organization_type) filters.organization_type = organization_type;
  if (name) filters.name = { [Op.iLike]: `%${name}%` };

  if (zipcode || city || state || organization_type || name) filters.status = 'ACTIVE';

  const centers = await models.DonationCenter.findAndCountAll({
    where: filters,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['created_at', 'DESC']]
  });

  res.status(200).json({ total: centers.count, centers: centers.rows });
}

// Update Blood Donation Center
async function updateDonationCenter(req, res) {
  const { id } = req.params;
  const updates = req.body;

  const restrictedFields = ['name', 'organization_id', 'type', 'organization_type'];
  for (const field of restrictedFields) {
    if (updates[field]) {
      return res.status(400).json({ error: `You cannot update the ${field} field` });
    }
  }

  const center = await models.DonationCenter.findByPk(id);
  if (!center || center.deleted_at) {
    return res.status(404).json({ error: 'Donation center not found' });
  }

  await center.update(updates);

  res.status(200).json({ message: 'Donation center updated successfully', center });
}

// Remove Blood Donation Center
async function removeDonationCenter(req, res) {
  const { id } = req.params;

  const center = await models.DonationCenter.findByPk(id);
  if (!center || center.deleted_at) {
    return res.status(404).json({ error: 'Donation center not found' });
  }

  await center.update({ status: 'INACTIVE', deleted_at: new Date() });

  res.status(200).json({ message: 'Donation center removed successfully' });
}

module.exports = {
  addDonationCenter,
  listDonationCenters,
  updateDonationCenter,
  removeDonationCenter
};
