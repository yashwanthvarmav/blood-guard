'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      blood_group: {
        type: Sequelize.STRING,
        allowNull: false
      },
      primary_phone_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      secondary_phone_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      home_address_line_one: {
        type: Sequelize.STRING,
        allowNull: false
      },
      home_address_line_two: {
        type: Sequelize.STRING,
        allowNull: true
      },
      home_city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      home_state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      home_country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      home_zip_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      work_address_line_one: {
        type: Sequelize.STRING,
        allowNull: true
      },
      work_address_line_two: {
        type: Sequelize.STRING,
        allowNull: true
      },
      work_city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      work_state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      work_country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      work_zip_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_pin: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true
      },
      user_account_status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      eligibility: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isIn: [['Eligible', 'Temporary Disqualification', 'Permanent Disqualification']]
        }
      },
      disqualification_type: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
      },
      next_eligibility_check: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      user_notifications: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isIn: [['When Required', 'Weekly', 'Monthly']]
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};

