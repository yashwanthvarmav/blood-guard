'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  Question.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    disqualification_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'None',
      validate: {
        isIn: [['None', 'Temporary', 'Permanent']]
      }
    },
    waiting_period_months: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: 'Applicable if disqualification_type is Temporary'
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
    modelName: 'Question',
    tableName: 'Questions',
    timestamps: true,
    paranoid: true,  // Enables "soft deletes" by using the deleted_at column
    underscored: true  // Converts camelCase column names to snake_case in the database
  });

  return Question;
};
