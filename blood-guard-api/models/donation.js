'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    /**
     * Associations
     */
    static associate(models) {
      // Associate with User
      Donation.belongsTo(models.User, { foreignKey: 'user_id' });

      // Associate with Organization
      Donation.belongsTo(models.Organization, { foreignKey: 'organization_id' });

      // Associate with DonationCenter
      Donation.belongsTo(models.DonationCenter, { foreignKey: 'donation_center_id' });

      // Associate with DonationCamp
      Donation.belongsTo(models.DonationCamp, { foreignKey: 'donation_camp_id' });
    }
  }

  Donation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Organizations',
          key: 'id',
        },
      },
      donation_center_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'donation_centers',
          key: 'id',
        },
      },
      donation_camp_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'donation_camps',
          key: 'id',
        },
      },
      user_action: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['Donate', 'Decline']], // Restrict actions to "Donate" or "Decline"
        },
      },
      blood_donation_status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['Pending', 'Completed', 'Cancelled']],
        },
      },
      blood_donated_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      blood_donation_remarks: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Donation',
      tableName: 'Donations',
      timestamps: true,
      paranoid: true, // Enables "soft deletes"
      underscored: true, // Converts camelCase to snake_case in the database
    }
  );

  return Donation;
};
