'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    blood_group: {
      type: DataTypes.STRING,
      allowNull: false
    },
    primary_phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    secondary_phone_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    home_address_line_one: {
      type: DataTypes.STRING,
      allowNull: false
    },
    home_address_line_two: {
      type: DataTypes.STRING,
      allowNull: true
    },
    home_city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    home_state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    home_country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    home_zip_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    work_address_line_one: {
      type: DataTypes.STRING,
      allowNull: true
    },
    work_address_line_two: {
      type: DataTypes.STRING,
      allowNull: true
    },
    work_city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    work_state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    work_country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    work_zip_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_pin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_account_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eligibility: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['Eligible', 'Temporary Disqualification', 'Permanent Disqualification']]
      }
    },
    disqualification_type: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    },
    next_eligibility_check: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    user_notifications: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['When Required', 'Weekly', 'Monthly']]
      }
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
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
    paranoid: true,  // This enables "soft deletes" using the deleted_at column
    underscored: true  // Converts camelCase column names to snake_case in the database
  });
  return User;
};
