const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const logger = require('../helpers/logger');
const { sendWelcomeEmail } = require('../helpers/mailservice'); // Import the email helper
const crypto = require('crypto');

async function registerUserController(data) {
    try {
        const userExists = await models.User.findOne({ where: { email: data.email } });
        if (userExists) {
            logger.error('User already registered');
            throw new Error('User already registered');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userPin = crypto.randomInt(100000, 999999);

        const newUser = await models.User.create({
            first_name: data.first_name,
            last_name: data.last_name,
            date_of_birth: data.date_of_birth,
            gender: data.gender,
            blood_group: data.blood_group,
            primary_phone_number: data.primary_phone_number,
            secondary_phone_number: data.secondary_phone_number,
            email: data.email,
            home_address_line_one: data.home_address_line_one,
            home_address_line_two: data.home_address_line_two,
            home_city: data.home_city,
            home_state: data.home_state,
            home_country: data.home_country,
            home_zip_code: data.home_zip_code,
            work_address_line_one: data.work_address_line_one,
            work_address_line_two: data.work_address_line_two,
            work_city: data.work_city,
            work_state: data.work_state,
            work_country: data.work_country,
            work_zip_code: data.work_zip_code,
            user_pin: userPin,
            password: hashedPassword,
            role: data.role,
            user_account_status: data.user_account_status,
            user_notifications: data.user_notifications,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        });

        // Send the welcome email
        await sendWelcomeEmail(data.email, userPin);

        logger.info('User registered successfully');
        return { message: 'User registered successfully', user: { email: newUser.email } };
    } catch (error) {
        logger.error(error.message);
        throw error;
    }
}

async function userLoginController(email, password, user_pin) {
  try {
      // Step 1: Find the user by email
      const user = await models.User.findOne({ where: { email, deleted_at: null } });
      if (!user) {
          throw new Error('User with this email does not exist');
      }

      // Step 2: Validate the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          throw new Error('Invalid password');
      }

      // Step 3: Validate the PIN
      if (parseInt(user.user_pin) !== parseInt(user_pin)) {
          throw new Error('Invalid PIN');
      }

      // Step 4: Fetch the latest eligibility status
      const eligibilityStatus = await models.EligibilityStatus.findOne({
          where: { user_id: user.id, deleted_at: null },
          order: [['created_at', 'DESC']]
      });

      let eligibilityInfo = { status: 'CheckEligibility' }; // Default response if no record is found

      if (eligibilityStatus) {
          eligibilityInfo.status = eligibilityStatus.eligibility;

          if (eligibilityStatus.eligibility === 'Temporary Disqualification') {
              eligibilityInfo.next_eligibility_date = eligibilityStatus.next_eligibility_check;
          }
      }

      // Step 5: Generate JWT token
      const token = jwt.sign(
          { userId: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );

      // Step 6: Return the response object
      return {
          message: 'Login successful',
          token,
          user: {
              id: user.id,
              email: user.email,
              role: user.role,
              eligibility: eligibilityInfo
          }
      };
  } catch (error) {
      console.error('Error in userLoginController:', error.message);
      throw error; // Propagate the error back to the route
  }
}

module.exports = {
    registerUserController,
    userLoginController
};