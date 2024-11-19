'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  Organization.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    organization_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organization_license_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organization_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organization_branch_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organization_date_of_establishment: {
      type: DataTypes.DATE,
      allowNull: false
    },
    organization_primary_phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organization_secondary_phone_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    organization_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    organization_address_line_one: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organization_address_line_two: {
      type: DataTypes.STRING,
      allowNull: true
    },
    organization_city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organization_state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organization_country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organization_zip_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organization_pin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true
    },
    organization_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Government', 'Private', 'NGO']]
      }
    },
    organization_account_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organization_account_remarks: {
      type: DataTypes.STRING,
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
    modelName: 'Organization',
    tableName: 'Organizations',
    timestamps: true,
    paranoid: true,  // Enables "soft deletes" by populating deleted_at
    underscored: true  // Converts camelCase column names to snake_case in the database
  });
  return Organization;
};
