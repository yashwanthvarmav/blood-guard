'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Corporates', {
      corporate_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      organization_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Organizations',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false
      },
      corporate_company_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      corporate_company_branch: {
        type: Sequelize.STRING,
        allowNull: false
      },
      corporate_camp_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      corporate_spoc_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      corporate_spoc_designation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      corporate_email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      corporate_phone_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      corporate_address_line_one: {
        type: Sequelize.STRING,
        allowNull: true
      },
      corporate_address_line_two: {
        type: Sequelize.STRING,
        allowNull: true
      },
      corporate_city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      corporate_state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      corporate_zip_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      corporate_message: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      support_status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['Pending', 'Approved', 'Rejected']]
        }
      },
      support_remarks: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Corporates');
  }
};

