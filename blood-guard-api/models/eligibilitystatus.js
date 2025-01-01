'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EligibilityStatus extends Model {
    static associate(models) {
      // Define association with User
      EligibilityStatus.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  EligibilityStatus.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    eligibility: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Eligible', 'Temporary Disqualification', 'Permanent Disqualification']]
      }
    },
    disqualification_type: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    },
    disqualification_end_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    next_eligibility_check: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    question_one: { type: DataTypes.BOOLEAN, allowNull: false },
    question_two: { type: DataTypes.BOOLEAN, allowNull: false },
    question_three: { type: DataTypes.BOOLEAN, allowNull: false },
    question_four: { type: DataTypes.BOOLEAN, allowNull: false },
    question_five: { type: DataTypes.BOOLEAN, allowNull: false },
    question_six: { type: DataTypes.BOOLEAN, allowNull: false },
    question_seven: { type: DataTypes.BOOLEAN, allowNull: false },
    question_eight: { type: DataTypes.BOOLEAN, allowNull: false },
    question_nine: { type: DataTypes.BOOLEAN, allowNull: false },
    question_ten: { type: DataTypes.BOOLEAN, allowNull: false },
    question_eleven: { type: DataTypes.BOOLEAN, allowNull: false },
    question_twelve: { type: DataTypes.BOOLEAN, allowNull: false },
    question_thirteen: { type: DataTypes.BOOLEAN, allowNull: false },
    question_fourteen: { type: DataTypes.BOOLEAN, allowNull: false },
    question_fifteen: { type: DataTypes.BOOLEAN, allowNull: false },
    question_sixteen: { type: DataTypes.BOOLEAN, allowNull: false },
    question_seventeen: { type: DataTypes.BOOLEAN, allowNull: false },
    question_eighteen: { type: DataTypes.BOOLEAN, allowNull: false },
    question_nineteen: { type: DataTypes.BOOLEAN, allowNull: false },
    question_twenty: { type: DataTypes.BOOLEAN, allowNull: false },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'EligibilityStatus',
    tableName: 'eligibility_status',
    timestamps: true,
    paranoid: true,
    underscored: true
  });

  return EligibilityStatus;
};
