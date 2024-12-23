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

async function sendWelcomeEmail(email, pin) {
    const subject = 'Welcome to Blood Guard!';
    const html = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;">
            <h1 style="color: #d32f2f;">Welcome to Blood Guard!</h1>
            <p style="font-size: 18px; color: #555;">Your journey to saving lives begins here.</p>
            
            <div style="margin: 20px auto; padding: 15px; background-color: #fff; border-radius: 8px; border: 1px solid #ddd; display: inline-block; width: fit-content;">
                <h3 style="margin: 0; color: #d32f2f;">Your Login PIN</h3>
                <p style="font-size: 22px; font-weight: bold; margin: 5px 0; color: #333;">${pin}</p>
            </div>

            <p style="font-size: 16px; color: #555;">Thank you for registering with Blood Guard. We are thrilled to have you join our mission of saving lives through blood donation. As a valued member, you now have access to resources, donation camps, and centers to make a difference.</p>
            
            <p style="font-size: 16px; color: #555;">Check if you're eligible to donate blood and take the next step in helping those in need. Visit our <a href="https://bloodguard-app.com/eligibility" style="color: #d32f2f; text-decoration: none;">Eligibility Check</a> page to learn more.</p>
            
            <img src="https://drive.google.com/uc?id=1rVdEmINXzs-Z6RJX-adLnYu6Re15b_6t" alt="Welcome to Blood Guard" style="width: 300px; height: auto; margin-top: 20px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
            
            <p style="font-size: 16px; color: #555; margin-top: 20px;">By donating blood, you can save up to three lives with a single donation. Together, we can make a lasting impact on communities in need.</p>
            
            <a href="https://bloodguard-app.com/login" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #d32f2f; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">Log in to Your Account</a>
            
            <p style="margin-top: 20px; font-size: 14px; color: #777;">If you have any questions, feel free to reach out to our support team at <a href="mailto:support@bloodguard-app.com" style="color: #d32f2f; text-decoration: none;">support@bloodguard-app.com</a>.</p>
            
            <p style="font-size: 14px; color: #999; margin-top: 20px;">Thank you for being a part of our mission. Together, we can save lives!</p>
        </div>
    `;
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Donor Registration email sent to ${mailOptions.to}`);
    } catch (error) {
        console.error(`Failed to send Donor Registration email: ${error.message}`);
        throw error;
    }
}

async function sendUserRecoverPinEmail(email, pin) {
    const subject = 'Alert - New PIN Generated for Blood Guard!';
    const html = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <img src="https://drive.google.com/uc?export=view&id=1mrF_o1tXmrqN_BaGbYuKq5rbV374vPK3" alt="Blood Guard Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #e63946;">New PIN Generated</h1>
            <p style="font-size: 16px; color: #333;">Dear Donor,</p>
            <p style="font-size: 16px; color: #333;">
                Your new 6-digit PIN for Blood Guard is:
            </p>
            <h2 style="color: #1d3557;">${pin}</h2>
            <p style="font-size: 16px; color: #333;">
                Please use this PIN to access your account. Ensure you keep this PIN secure and do not share it with anyone.
            </p>
            <p style="font-size: 16px; color: #333;">
                At Blood Guard, we value your contribution to saving lives. Please consider checking your blood donation eligibility and help us make a difference!
            </p>
            <a href="https://your-blood-guard-site.com/eligibility-check" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #457b9d; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
                Check Eligibility
            </a>
            <p style="font-size: 14px; color: #666; margin-top: 20px;">
                If you did not request a new PIN, please contact us immediately at 
                <a href="mailto:support@bloodguard.com" style="color: #e63946;">support@bloodguard.com</a>.
            </p>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">
                Together, we are saving lives. Thank you for your unwavering support!
            </p>
        </div>
    `;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Donor Pin Recovery email sent to ${mailOptions.to}`);
    } catch (error) {
        console.error(`Failed to send Donor Pin Recovery email: ${error.message}`);
        throw error;
    }
}

async function sendAdminNotificationEmail(adminEmail, organization) {
    const subject = 'New Organization Registration - Blood Guard Application Alert';
    const html = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <img src="https://drive.google.com/uc?export=view&id=1mrF_o1tXmrqN_BaGbYuKq5rbV374vPK3" alt="Blood Guard Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #ff4747;">New Organization Registration</h1>
            <p>A new organization has registered on the Blood Guard application. Here are the details:</p>
            <div style="text-align: left; margin: 0 auto; max-width: 400px;">
                <p><strong>Organization Code:</strong> ${organization.organization_code}</p>
                <p><strong>License Number:</strong> ${organization.organization_license_number}</p>
                <p><strong>Email:</strong> ${organization.organization_email}</p>
                <p><strong>Branch Name:</strong> ${organization.organization_branch_name}</p>
                <p><strong>Name:</strong> ${organization.organization_name}</p>
                <p><strong>City:</strong> ${organization.organization_city}</p>
                <p><strong>State:</strong> ${organization.organization_state}</p>
                <p><strong>Country:</strong> ${organization.organization_country}</p>
                <p><strong>Zip Code:</strong> ${organization.organization_zip_code}</p>
            </div>
            <p style="margin-top: 20px;">Please log in to the admin panel to review and approve this registration.</p>
        </div>
    `;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: adminEmail,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`New Organization Registration email sent to ${mailOptions.to}`);
    } catch (error) {
        console.error(`Failed to send New Organization Registration email: ${error.message}`);
        throw error;
    }
}

async function sendNewOrganizationRegisterEmail(email, organization) {
    const subject = 'Organization Registration Successfull- Blood Guard Application';
    const html = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <img src="https://drive.google.com/uc?export=view&id=1mrF_o1tXmrqN_BaGbYuKq5rbV374vPK3" alt="Blood Guard Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #ff4747;">New Organization Registration</h1>
            <p>Organization has registered on the Blood Guard application. Here are the details:</p>
            <div style="text-align: left; margin: 0 auto; max-width: 400px;">
                <p><strong>Organization Code:</strong> ${organization.organization_code}</p>
                <p><strong>License Number:</strong> ${organization.organization_license_number}</p>
                <p><strong>Email:</strong> ${organization.organization_email}</p>
                <p><strong>Branch Name:</strong> ${organization.organization_branch_name}</p>
                <p><strong>Name:</strong> ${organization.organization_name}</p>
                <p><strong>City:</strong> ${organization.organization_city}</p>
                <p><strong>State:</strong> ${organization.organization_state}</p>
                <p><strong>Country:</strong> ${organization.organization_country}</p>
                <p><strong>Zip Code:</strong> ${organization.organization_zip_code}</p>
            </div>
            <p style="margin-top: 20px;">Please wait till the account activation confirmation in to the Blood Guard admin.</p>
        </div>
    `;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`New Organization Registration email sent to ${mailOptions.to}`);
    } catch (error) {
        console.error(`Failed to send New Organization Registration email: ${error.message}`);
        throw error;
    }
}

async function sendOrganizationPendingEmail(email, status, remarks) {
    const subject = 'Blood Guard - Organization Account Status: Pending';
    const html = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <img src="https://drive.google.com/uc?export=view&id=1mrF_o1tXmrqN_BaGbYuKq5rbV374vPK3" alt="Blood Guard Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #ff4747;">Account Status: Pending</h1>
            <p style="margin-bottom: 20px;">Your organization account on Blood Guard has been updated to <strong>${status}</strong> status.</p>
            <div style="text-align: left; margin: 0 auto; max-width: 400px; background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <p><strong>Remarks from Admin:</strong></p>
                <p style="color: #333; font-style: italic; margin: 10px 0;">"${remarks}"</p>
            </div>
            <p style="margin-top: 20px;">We kindly request you to review the above remarks and take the necessary actions. If you have any questions or need further assistance, please contact our support team.</p>
            <p style="margin-top: 20px;">
                <a href="mailto:support@bloodguard.com" style="text-decoration: none; color: #ffffff; background-color: #ff4747; padding: 10px 20px; border-radius: 5px;">Contact Support</a>
            </p>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">Thank you for your cooperation and support in making Blood Guard a success.</p>
        </div>
    `;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Organization Account status email sent to ${mailOptions.to}`);
    } catch (error) {
        console.error(`Failed to send Organization Account status email: ${error.message}`);
        throw error;
    }

}

async function sendOrganizationActivatedEmail(email, pin) {
    const subject = 'Welcome to Blood Guard - Organization Account Activated';
    const html = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <img src="https://drive.google.com/uc?export=view&id=1mrF_o1tXmrqN_BaGbYuKq5rbV374vPK3" alt="Blood Guard Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #ff4747;">Congratulations!</h1>
            <p>Your organization's account has been successfully activated and is now ACTIVE on the Blood Guard application.</p>
            <div style="text-align: left; margin: 0 auto; max-width: 400px; background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <p><strong>Your Organization PIN:</strong> <span style="font-size: 18px; color: #ff4747;">${pin}</span></p>
            </div>
            <p style="margin-top: 20px;">
                With your account now active, you can:
            </p>
            <ul style="text-align: left; margin: 0 auto; max-width: 400px; color: #555;">
                <li>Add Donation Centers to facilitate blood collection.</li>
                <li>Organize Donation Camps to further our mission of saving lives.</li>
                <li>Track and manage your organization's blood donation activities.</li>
            </ul>
            <p style="margin-top: 20px;">We are excited to have you join our mission to make blood donation more accessible and impactful. Let’s save lives together!</p>
            <p style="margin-top: 20px;">If you have any questions or need assistance, feel free to contact our support team.</p>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">Note: Keep your PIN confidential and use it to log in securely.</p>
        </div>
    `;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Organization Account Activation email sent to ${mailOptions.to}`);
    } catch (error) {
        console.error(`Failed to send Organization Account Activation email: ${error.message}`);
        throw error;
    }
}

async function sendOrganizationNewPinEmail(email, pin) {
    const subject = 'Blood Guard - New PIN Generated for Your Organization Account';
    const html = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <img src="https://drive.google.com/uc?export=view&id=1mrF_o1tXmrqN_BaGbYuKq5rbV374vPK3" alt="Blood Guard Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #ff4747;">Your New PIN is Ready!</h1>
            <p style="margin-bottom: 20px;">As requested, a new PIN has been generated for your organization account on Blood Guard.</p>
            <div style="text-align: center; margin: 0 auto; max-width: 400px; background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <p><strong>Your New Organization PIN:</strong></p>
                <h2 style="color: #ff4747; font-size: 24px; margin: 10px 0;">${pin}</h2>
            </div>
            <p style="margin-top: 20px;">Please use this PIN to access your organization account securely.</p>
            <p style="margin-top: 20px;">If you did not request this PIN, please contact our support team immediately to ensure the security of your account.</p>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">Note: Keep this PIN confidential and do not share it with anyone.</p>
        </div>
    `;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Organization Pin Recovery email sent to ${mailOptions.to}`);
    } catch (error) {
        console.error(`Failed to send Organization Pin Recovery email: ${error.message}`);
        throw error;
    }
}

async function sendEligibilityEmail(userId, eligibility, disqualification_reasons, disqualification_end_date) {
    const user = await models.User.findByPk(userId);
    if (!user) throw new Error('User not found');

    // Extract only the reasons (comments) from disqualification_reasons
    const reasonsList = disqualification_reasons.map((reason) => reason.split(': ')[1]); // Get the part after ": "

    // Define image URLs
    const images = {
        Eligible: 'https://drive.google.com/uc?export=view&id=18EBlhGJUGGM5Ru8sutsu10SKe5sAW14o',
        'Temporary Disqualification': 'https://drive.google.com/uc?export=view&id=1AFcOTvvi0HNVSzC6pjpNTXglqwuac5TK',
        'Permanent Disqualification': 'https://drive.google.com/uc?export=view&id=1RCfEZgBY1QaDH70S-4RTlE9U3CZe8cIc'
    };

    let subject = 'Blood Donation Eligibility Update';
    let html = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <img src="${images[eligibility]}" alt="${eligibility}" style="width: 200px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #ff4747;">Blood Donation Eligibility</h1>
            <p style="margin-bottom: 20px;">Dear ${user.first_name},</p>
    `;

    // Customize the email content based on eligibility
    if (eligibility === 'Eligible') {
        html += `
            <p style="margin-bottom: 20px;">Congratulations! You are eligible to donate blood. Thank you for your willingness to help save lives.</p>
            <p style="margin-bottom: 20px;">Your generosity can make a difference for those in need.</p>
        `;
    } else if (eligibility === 'Temporary Disqualification') {
        html += `
            <p style="margin-bottom: 20px;">You are temporarily ineligible to donate blood for the following reasons:</p>
            <ul style="text-align: left; margin: 0 auto; max-width: 400px; padding: 15px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                ${reasonsList.map((reason) => `<li>${reason}</li>`).join('')}
            </ul>
            <p style="margin-top: 20px;">You will be eligible to donate again after <strong>${moment(disqualification_end_date).format('MMM Do, YYYY')}</strong>.</p>
        `;
    } else if (eligibility === 'Permanent Disqualification') {
        html += `
            <p style="margin-bottom: 20px;">We regret to inform you that you are permanently ineligible to donate blood due to the following reasons:</p>
            <ul style="text-align: left; margin: 0 auto; max-width: 400px; padding: 15px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                ${reasonsList.map((reason) => `<li>${reason}</li>`).join('')}
            </ul>
            <p style="margin-top: 20px;">Please consult with healthcare providers for more information and guidance.</p>
        `;
    }

    html += `
            <p style="margin-top: 20px;">Thank you for your understanding and your commitment to supporting those in need.</p>
            <p style="margin-top: 20px;">For any questions or assistance, feel free to contact us at <a href="mailto:support@bloodguard.com" style="color: #ff4747;">support@bloodguard.com</a>.</p>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply directly to this message.</p>
        </div>
    `;

    // Send the email
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: user.email,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Eligibility email sent to ${user.email}`);
    } catch (error) {
        console.error(`Failed to send eligibility email: ${error.message}`);
        throw error;
    }
}

async function sendDonationCompletionEmail(userId) {
    const user = await models.User.findByPk(userId);
    if (!user) throw new Error('User not found');

    const subject = 'Thank You for Your Blood Donation - Blood Guard';
    const imageUrl = 'https://drive.google.com/uc?export=view&id=1qh09ApRgIZ_UXPjQFQuQjLoNWBX2tFC9';

    const html = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <img src="${imageUrl}" alt="Thank You" style="width: 300px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #4caf50;">Thank You for Saving Lives!</h1>
            <p style="margin-bottom: 20px;">Dear ${user.first_name} ${user.last_name},</p>
            <p style="margin-bottom: 20px;">
                We sincerely thank you for your recent blood donation on 
                <strong>${new Date().toLocaleDateString()}</strong>.
                Your contribution is invaluable in saving lives and making a difference in the community.
            </p>
            <div style="text-align: left; margin: 0 auto; max-width: 500px; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h3 style="margin-bottom: 10px;">Donation Details:</h3>
                <p><strong>Blood Group:</strong> ${user.blood_group}</p>    
                <p><strong>Donation Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            <p style="margin-top: 20px;">We hope to see you again for another donation soon. Together, we can continue to save lives.</p>
            <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
            <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The Blood Guard Team</strong></p>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
        </div>
    `;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: user.email,
        subject,
        html
    };

    try {

        await transporter.sendMail(mailOptions);
        console.log(`Donation completion email sent to ${user.email}`);
    } catch (error) {
        console.error(`Failed to send donation completion email: ${error.message}`);
        throw error;
    }
}

async function sendBloodDonationRequestEmail(user, organization) {
    const subject = `Urgent: Blood Donation Request from ${organization.organization_name}`;
    const imageUrl = 'https://drive.google.com/uc?export=view&id=1wCxUmCk499VqgncAgVQgZar1H8EMyuae';

    const html = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <img src="${imageUrl}" alt="Urgent Blood Donation Request" style="width: 300px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #ff4747;">Urgent Blood Donation Request</h1>
            <p style="margin-bottom: 20px;">Dear ${user.first_name} ${user.last_name},</p>
            <p style="margin-bottom: 20px;">
                We are reaching out to request your invaluable support for an urgent blood donation. Your contribution can make a life-saving difference.
            </p>
            <div style="text-align: left; margin: 0 auto; max-width: 500px; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h3 style="margin-bottom: 10px;">Details:</h3>
                <p><strong>Organization Name:</strong> ${organization.organization_name}</p>
                <p><strong>Branch Name:</strong> ${organization.organization_branch_name}</p>
                <p><strong>Address:</strong> ${organization.organization_address_line_one}, ${organization.organization_city}, ${organization.organization_state}, ${organization.organization_country}, ${organization.organization_zip_code}</p>
                <p><strong>Contact:</strong> ${organization.organization_primary_phone_number}</p>
            </div>
            <p style="margin-top: 20px;">Please consider visiting the above location or contacting us at your earliest convenience.</p>
            <p style="margin-top: 20px; font-size: 14px; color: #555;">Together, we can save lives. Thank you for your continued support!</p>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email from Blood Guard. Please do not reply directly to this message.</p>
        </div>
    `;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: user.email,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Blood donation request email sent to ${user.email}`);
    } catch (error) {
        console.error(`Failed to send blood donation request email: ${error.message}`);
        throw error;
    }
}

async function sendCorporateCreatedEmail(corporate, organization) {
  const subject = `New Blood Donation Camp Request - ${corporate.corporate_camp_name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; text-align: left; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <img src="https://drive.google.com/uc?export=view&id=1mrF_o1tXmrqN_BaGbYuKq5rbV374vPK3" alt="Blood Guard Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
        <h2 style="color: #491d8b; margin-bottom: 10px;">New Blood Donation Camp Request</h2>
        <p style="font-size: 16px; margin-bottom: 20px;">A new camp request has been submitted with the following details:</p>
        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <ul style="list-style-type: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 10px;"><strong>Company Name:</strong> ${corporate.corporate_company_name}</li>
                <li style="margin-bottom: 10px;"><strong>Branch:</strong> ${corporate.corporate_company_branch}</li>
                <li style="margin-bottom: 10px;"><strong>Camp Name:</strong> ${corporate.corporate_camp_name}</li>
                <li style="margin-bottom: 10px;"><strong>SPOC Name:</strong> ${corporate.corporate_spoc_name}</li>
                <li style="margin-bottom: 10px;"><strong>SPOC Designation:</strong> ${corporate.corporate_spoc_designation}</li>
                <li style="margin-bottom: 10px;"><strong>Contact Email:</strong> ${corporate.corporate_email}</li>
                <li style="margin-bottom: 10px;"><strong>Phone Number:</strong> ${corporate.corporate_phone_number}</li>
                <li style="margin-bottom: 10px;"><strong>Address:</strong> ${corporate.corporate_address_line_one || ''}, ${corporate.corporate_city || ''}, ${corporate.corporate_state}, ${corporate.corporate_zip_code}</li>
            </ul>
        </div>
        <p style="margin-top: 20px; font-size: 14px;">Please review the above details and take the necessary actions to coordinate this request. Together, we can make a difference!</p>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email from Blood Guard. Please do not reply directly to this message.</p>
    </div>
    `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: corporate.corporate_email,
    subject,
    html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Corporate Request email sent to ${mailOptions.to}`);
    } catch (error) {
        console.error(`Failed to send Corporate Request email: ${error.message}`);
        throw error;
    }

    const mailOptionsTemp = {
        from: process.env.GMAIL_USER,
        to: organization.organization_email,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptionsTemp);
        console.log(`Blood donation request email sent to ${mailOptionsTemp.to}`);
    } catch (error) {
        console.error(`Failed to send blood donation request email: ${error.message}`);
        throw error;
    }

}

async function sendCorporateStatusUpdateEmail(corporate) {
    const subject = `Status Update: ${corporate.corporate_camp_name}`;
    const html = `
        <div style="font-family: Arial, sans-serif; text-align: left; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <img src="https://drive.google.com/uc?export=view&id=1mrF_o1tXmrqN_BaGbYuKq5rbV374vPK3" alt="Blood Guard Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
            <h2 style="color: #491d8b; margin-bottom: 10px;">Status Update for Your Blood Donation Camp Request</h2>
            <p style="font-size: 16px; margin-bottom: 20px;">Your request for the camp <strong>${corporate.corporate_camp_name}</strong> has been updated.</p>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <ul style="list-style-type: none; padding: 0; margin: 0;">
                    <li style="margin-bottom: 10px;"><strong>Status:</strong> ${corporate.support_status}</li>
                    <li style="margin-bottom: 10px;"><strong>Remarks:</strong> ${corporate.support_remarks || 'No remarks provided'}</li>
                </ul>
            </div>
            <p style="margin-top: 20px; font-size: 14px;">Thank you for coordinating with us. If you have further queries, please feel free to reach out to our support team.</p>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email from Blood Guard. Please do not reply directly to this message.</p>
        </div>
    `;


    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: corporate.corporate_email,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Corporate Status Update email sent to ${mailOptions.to}`);
    } catch (error) {
        console.error(`Failed to send Corporate Status Update email: ${error.message}`);
        throw error;
    }
}

async function sendContactRequestCreationEmail(contact) {
    const subject = 'Thank You for Requesting to Contact Blood Guard';
    const imageUrl = 'https://drive.google.com/uc?export=view&id=1mrF_o1tXmrqN_BaGbYuKq5rbV374vPK3';

    const html = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <img src="${imageUrl}" alt="Blood Guard Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #4caf50;">Contact Request Received</h1>
            <p style="margin-bottom: 20px;">Dear ${contact.contact_name},</p>
            <p style="margin-bottom: 20px;">
                Thank you for reaching out to Blood Guard. We have successfully received your contact request. Here are the details of your submission:
            </p>
            <div style="text-align: left; margin: 0 auto; max-width: 500px; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h3 style="margin-bottom: 10px;">Request Details:</h3>
                <p><strong>Name:</strong> ${contact.contact_name}</p>
                <p><strong>Phone:</strong> ${contact.contact_phone_number}</p>
                <p><strong>Email:</strong> ${contact.contact_email}</p>
                <p><strong>Subject:</strong> ${contact.contact_subject}</p>
                <p><strong>Message:</strong> ${contact.contact_message}</p>
            </div>
            <p style="margin-top: 20px;">Our team will get back to you shortly. Thank you for your interest in Blood Guard.</p>
            <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
            <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The Blood Guard Team</strong></p>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
        </div>
    `;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: contact.contact_email,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Contact request email sent to ${contact.contact_email}`);
    } catch (error) {
        console.error(`Failed to send contact request email: ${error.message}`);
        throw error;
    }
}

async function sendContactRequestUpdateEmail(contact_email, contact_status, contact_remarks) {
    const subject = 'Contact Request Update Alert - Blood Guard';
    const imageUrl = 'https://drive.google.com/uc?export=view&id=1mrF_o1tXmrqN_BaGbYuKq5rbV374vPK3';

    const html = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <img src="${imageUrl}" alt="Blood Guard Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #4caf50;">Status Update for Your Contact Request</h1>
            <p style="margin-bottom: 20px;">Dear User,</p>
            <p style="margin-bottom: 20px;">
                Your contact request status has been updated. Here are the latest details:
            </p>
            <div style="text-align: left; margin: 0 auto; max-width: 500px; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h3 style="margin-bottom: 10px;">Updated Status:</h3>
                <p><strong>Status:</strong> ${contact_status}</p>
                <p><strong>Remarks:</strong> ${contact_remarks || 'No additional remarks provided.'}</p>
            </div>
            <p style="margin-top: 20px;">If you have further queries, feel free to reach out to our support team. Thank you for your interest in Blood Guard.</p>
            <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
            <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The Blood Guard Team</strong></p>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
        </div>
    `;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: contact_email,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Contact request update email sent to ${contact_email}`);
    } catch (error) {
        console.error(`Failed to send contact request update email: ${error.message}`);
        throw error;
    }
}

async function sendSupportRequestCreationEmail(support) {
    const subject = 'Thank You for Reaching Blood Guard Support';
    const imageUrl = 'https://drive.google.com/uc?export=view&id=1mrF_o1tXmrqN_BaGbYuKq5rbV374vPK3';

    const html = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <img src="${imageUrl}" alt="Blood Guard Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #4caf50;">Support Request Received</h1>
            <p style="margin-bottom: 20px;">Dear ${support.support_name},</p>
            <p style="margin-bottom: 20px;">
                Thank you for reaching out to Blood Guard Support. We have successfully received your support request. Here are the details of your submission:
            </p>
            <div style="text-align: left; margin: 0 auto; max-width: 500px; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h3 style="margin-bottom: 10px;">Request Details:</h3>
                <p><strong>Name:</strong> ${support.support_name}</p>
                <p><strong>Email:</strong> ${support.support_email}</p>
                <p><strong>Phone:</strong> ${support.support_phone_number}</p>
                <p><strong>Type:</strong> ${support.support_type}</p>
                <p><strong>Subject:</strong> ${support.support_subject}</p>
                <p><strong>Message:</strong> ${support.support_message}</p>
            </div>
            <p style="margin-top: 20px;">Our support team will get back to you shortly. Thank you for your patience and trust in Blood Guard.</p>
            <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
            <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The Blood Guard Team</strong></p>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
        </div>
    `;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: support.support_email,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Support request creation email sent to ${support.support_email}`);
    } catch (error) {
        console.error(`Failed to send support request creation email: ${error.message}`);
        throw error;
    }
}

async function sendSupportRequestUpdateEmail(support_email, support_status, support_remarks) {
    const subject = 'Support Request Update Alert - Blood Guard';
    const imageUrl = 'https://drive.google.com/uc?export=view&id=1mrF_o1tXmrqN_BaGbYuKq5rbV374vPK3';

    const html = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <img src="${imageUrl}" alt="Blood Guard Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #4caf50;">Status Update for Your Support Request</h1>
            <p style="margin-bottom: 20px;">Dear User,</p>
            <p style="margin-bottom: 20px;">
                Your support request status has been updated. Here are the latest details:
            </p>
            <div style="text-align: left; margin: 0 auto; max-width: 500px; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h3 style="margin-bottom: 10px;">Updated Status:</h3>
                <p><strong>Status:</strong> ${support_status}</p>
                <p><strong>Remarks:</strong> ${support_remarks || 'No additional remarks provided.'}</p>
            </div>
            <p style="margin-top: 20px;">If you have further queries, feel free to reach out to our support team. Thank you for your patience and trust in Blood Guard.</p>
            <p style="margin-top: 20px; font-size: 14px; color: #555;">Warm regards,</p>
            <p style="margin-top: 5px; font-size: 14px; color: #555;"><strong>The Blood Guard Team</strong></p>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
        </div>
    `;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: support_email,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Support request update email sent to ${support_email}`);
    } catch (error) {
        console.error(`Failed to send support request update email: ${error.message}`);
        throw error;
    }
}

module.exports = {
    sendWelcomeEmail,
    sendAdminNotificationEmail,
    sendOrganizationActivatedEmail,
    sendOrganizationPendingEmail,
    sendEligibilityEmail,
    sendBloodDonationRequestEmail,
    sendUserRecoverPinEmail,
    sendOrganizationNewPinEmail,
    sendCorporateCreatedEmail,
    sendCorporateStatusUpdateEmail,
    sendDonationCompletionEmail,
    sendContactRequestCreationEmail,
    sendContactRequestUpdateEmail,
    sendSupportRequestCreationEmail,
    sendSupportRequestUpdateEmail,
    sendNewOrganizationRegisterEmail
};
