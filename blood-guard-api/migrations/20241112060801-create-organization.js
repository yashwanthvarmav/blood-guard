'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Organizations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      organization_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      organization_license_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      organization_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      organization_branch_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      organization_date_of_establishment: {
        type: Sequelize.DATE,
        allowNull: false
      },
      organization_primary_phone_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      organization_secondary_phone_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      organization_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      organization_address_line_one: {
        type: Sequelize.STRING,
        allowNull: false
      },
      organization_address_line_two: {
        type: Sequelize.STRING,
        allowNull: true
      },
      organization_city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      organization_state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      organization_country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      organization_zip_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      organization_pin: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true
      },
      organization_type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['Government', 'Private', 'NGO']]
        }
      },
      organization_account_status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      organization_account_remarks: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('Organizations');
  }
};

