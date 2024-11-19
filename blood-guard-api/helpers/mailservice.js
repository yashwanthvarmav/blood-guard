const nodemailer = require('nodemailer');
const models = require('../models');
const moment = require('moment');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

/**
 * Sends an email to the specified recipient.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject.
 * @param {string} text - Email body content.
 * @returns {Promise<void>}
 */
async function sendEmail(to, subject, text) {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: to,
        subject: subject,
        text: text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error(`Failed to send email: ${error.message}`);
        throw error;
    }
}

/**
 * Sends a welcome email with a PIN.
 * @param {string} email - Recipient email address.
 * @param {number} pin - 6-digit PIN.
 * @returns {Promise<void>}
 */
async function sendWelcomeEmail(email, pin) {
    const subject = 'Welcome to Blood Guard!';
    const text = `Welcome to Blood Guard! Your 6-digit pin is ${pin}. Thank you for Joining us to save lives by donating blood!`;
    await sendEmail(email, subject, text);
}

async function sendAdminNotificationEmail(adminEmail, organization) {
    const subject = 'New Organization Registration';
    const text = `A new organization has registered with the following details:
    - Organization Code: ${organization.organization_code}
    - License Number: ${organization.organization_license_number}
    - Email: ${organization.organization_email}
    - Branch Name: ${organization.organization_branch_name}
    - Name: ${organization.organization_name}
    - City: ${organization.organization_city}
    - State: ${organization.organization_state}
    - Country: ${organization.organization_country}
    - Zip Code: ${organization.organization_zip_code}`;

    await sendEmail(adminEmail, subject, text);
}

async function sendOrganizationActivatedEmail(email, pin) {
    const subject = 'Organization Account Activated';
    const text = `Congratulations! Your organization account has been verified and is now ACTIVE. Your organization PIN is ${pin}.`;

    await sendEmail(email, subject, text);
}

async function sendOrganizationPendingEmail(email, status, remarks) {
    const subject = 'Organization Account Status: Pending';
    const text = `Your organization account status has been updated to PENDING. Remarks: ${remarks}.`;

    await sendEmail(email, subject, text);
}

async function sendEligibilityEmail(userId, eligibility, disqualification_reasons, disqualification_end_date) {
    const user = await models.User.findByPk(userId);
    if (!user) throw new Error('User not found');

    let subject = 'Blood Donation Eligibility Update';
    let text = `Dear ${user.first_name},\n\n`;

    // Extract only the reasons (comments) from disqualification_reasons
    const reasonsList = disqualification_reasons.map((reason) => reason.split(': ')[1]); // Get the part after ": "

    // Customize the email content based on eligibility
    if (eligibility === 'Eligible') {
        text += 'Congratulations! You are eligible to donate blood. Thank you for your willingness to help save lives.';
    } else if (eligibility === 'Temporary Disqualification') {
        text += `You are temporarily ineligible to donate blood for the following reasons:\n`;
        text += reasonsList.map((reason) => `- ${reason}`).join('\n');
        text += `\n\nYou will be eligible again after ${moment(disqualification_end_date).format('MMM Do, YYYY')}.`;
    } else if (eligibility === 'Permanent Disqualification') {
        text += `We regret to inform you that you are permanently ineligible to donate blood due to the following reasons:\n`;
        text += reasonsList.map((reason) => `- ${reason}`).join('\n');
        text += '\n\nPlease consult with healthcare providers for more information.';
    }

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: user.email,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Eligibility email sent to ${user.email}`);
    } catch (error) {
        console.error(`Failed to send eligibility email: ${error.message}`);
        throw error;
    }
}


/**
 * Sends a blood donation request email to a user with organization details.
 * @param {Object} user - User details.
 * @param {Object} organization - Organization details.
 * @returns {Promise<void>}
 */
async function sendBloodDonationRequestEmail(user, organization) {
    const subject = `Urgent Blood Donation Request from ${organization.organization_name}`;
    const text = `
      Dear ${user.first_name} ${user.last_name},

      We are reaching out to request your support for an urgent blood donation. The details are as follows:

      Organization Name: ${organization.organization_name}
      Branch Name: ${organization.organization_branch_name}
      Address: ${organization.organization_address_line_one}, ${organization.organization_city}, ${organization.organization_state}, ${organization.organization_country}, ${organization.organization_zip_code}
      Phone: ${organization.organization_primary_phone_number}

      Your contribution can save lives. Please consider visiting the above location or contacting us at your earliest convenience.

      Thank you for your support!

      Best Regards,
      Blood Guard Team
    `;

    await sendEmail(user.email, subject, text);
}


module.exports = {
    sendWelcomeEmail,
    sendAdminNotificationEmail,
    sendOrganizationActivatedEmail,
    sendOrganizationPendingEmail,
    sendEligibilityEmail,
    sendBloodDonationRequestEmail
};