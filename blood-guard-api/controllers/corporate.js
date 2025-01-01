const models = require('../models');
const { Op } = require('sequelize');

async function getCorporateRecords(query) {
    const {
        corporate_id,
        organization_id,
        support_status,
        corporate_email,
        corporate_camp_name
    } = query;

    const whereCondition = {};

    // Add filters if provided
    if (corporate_id) whereCondition.corporate_id = corporate_id;
    if (organization_id) whereCondition.organization_id = organization_id;
    if (support_status) whereCondition.support_status = support_status;
    if (corporate_email) whereCondition.corporate_email = { [Op.iLike]: `%${corporate_email}%` };
    if (corporate_camp_name) whereCondition.corporate_camp_name = { [Op.iLike]: `%${corporate_camp_name}%` };

    const corporates = await models.Corporate.findAndCountAll({
        where: whereCondition,
        include: [
            {
                model: models.Organization,
                attributes: ['organization_name', 'organization_email']
            }
        ],
        order: [['created_at', 'DESC']]
    });

    return {
        total: corporates.count,
        records: corporates.rows
    };
}

module.exports = {
    getCorporateRecords
};
