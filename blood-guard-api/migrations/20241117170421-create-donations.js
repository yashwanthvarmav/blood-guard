'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Donations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Matches table name from Users migration
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      organization_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Organizations', // Matches table name from Organizations migration
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      donation_center_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'donation_centers', // Matches table name from DonationCenters migration
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      donation_camp_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'donation_camps', // Matches table name from DonationCamps migration
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      blood_group: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_action: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      blood_donation_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      blood_donated_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      blood_donation_remarks: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Donations');
  },
};
