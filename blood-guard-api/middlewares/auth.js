const jwt = require('jsonwebtoken');
const models = require('../models');

/**
 * Middleware to validate JWT token and identify request type.
 * @param {*} req - Incoming request
 * @param {*} res - Response object
 * @param {*} next - Next middleware
 */
async function validateToken(req, res, next) {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Extract identifiers from token
        const { userId, organizationId, adminId, role } = decoded;

        if (userId && role === 'DONOR') {
            const user = await models.User.findByPk(userId);
            if (!user || user.deleted_at) {
                return res.status(401).json({ error: 'Invalid or expired token for user' });
            }
            req.user = user; // Attach user to the request for later use
        } else if (organizationId && role === 'ORGANIZATION') {
            const organization = await models.Organization.findByPk(organizationId);
            if (!organization || organization.deleted_at) {
                return res.status(401).json({ error: 'Invalid or expired token for organization' });
            }
            req.organization = organization; // Attach organization to the request for later use
        } else if (adminId && role === 'ADMIN') {
            const admin = await models.Admin.findByPk(adminId);
            if (!admin || admin.deleted_at) {
                return res.status(401).json({ error: 'Invalid or expired token for admin' });
            }
            req.admin = admin; // Attach admin to the request for later use
        } else {
            return res.status(401).json({ error: 'Invalid token payload or role' });
        }

        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        console.error('Token validation error:', error.message);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = {
    validateToken
};
