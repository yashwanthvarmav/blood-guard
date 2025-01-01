'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('donation_centers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'ACTIVE',
        validate: {
          isIn: [['ACTIVE', 'INACTIVE']]
        }
      },
      address_line_one: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address_line_two: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      zipcode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['BLOOD DONATION CENTER', 'BLOOD BANK']]
        }
      },
      organization_type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['Government', 'Private', 'NGO']]
        }
      },
      open_timings: {
        type: Sequelize.STRING,
        allowNull: true
      },
      holiday_timings: {
        type: Sequelize.STRING,
        allowNull: true
      },
      open_weekly_days: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Specify days center is open, e.g., Mon-Fri'
      },
      organization_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Organizations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('donation_centers');
  }
};

