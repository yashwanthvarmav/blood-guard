'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DonationCamp extends Model {
    static associate(models) {
      // Association with Organization
      DonationCamp.belongsTo(models.Organization, { foreignKey: 'organization_id' });
    }
  }

  DonationCamp.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'ACTIVE',
      validate: {
        isIn: [['ACTIVE', 'INACTIVE']]
      }
    },
    address_line_one: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address_line_two: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'BLOOD CAMP'
    },
    camp_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Government', 'Private', 'NGO']]
      }
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    open_timings: {
      type: DataTypes.STRING,
      allowNull: true
    },
    collaboration_with: {
      type: DataTypes.STRING,
      allowNull: true
    },
    organization_id: {
      type: DataTypes.INTEGER,
      references: { model: 'Organizations', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'DonationCamp',
    tableName: 'donation_camps',
    timestamps: true,
    paranoid: true,  // Enables soft delete by populating deleted_at
    underscored: true  // Converts camelCase to snake_case in the database
  });

  return DonationCamp;
};
