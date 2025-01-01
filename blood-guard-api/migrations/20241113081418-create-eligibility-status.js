'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('eligibility_status', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      eligibility: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['Eligible', 'Temporary Disqualification', 'Permanent Disqualification']]
        }
      },
      disqualification_type: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
      },
      disqualification_end_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      next_eligibility_check: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      question_one: { type: Sequelize.BOOLEAN, allowNull: false },
      question_two: { type: Sequelize.BOOLEAN, allowNull: false },
      question_three: { type: Sequelize.BOOLEAN, allowNull: false },
      question_four: { type: Sequelize.BOOLEAN, allowNull: false },
      question_five: { type: Sequelize.BOOLEAN, allowNull: false },
      question_six: { type: Sequelize.BOOLEAN, allowNull: false },
      question_seven: { type: Sequelize.BOOLEAN, allowNull: false },
      question_eight: { type: Sequelize.BOOLEAN, allowNull: false },
      question_nine: { type: Sequelize.BOOLEAN, allowNull: false },
      question_ten: { type: Sequelize.BOOLEAN, allowNull: false },
      question_eleven: { type: Sequelize.BOOLEAN, allowNull: false },
      question_twelve: { type: Sequelize.BOOLEAN, allowNull: false },
      question_thirteen: { type: Sequelize.BOOLEAN, allowNull: false },
      question_fourteen: { type: Sequelize.BOOLEAN, allowNull: false },
      question_fifteen: { type: Sequelize.BOOLEAN, allowNull: false },
      question_sixteen: { type: Sequelize.BOOLEAN, allowNull: false },
      question_seventeen: { type: Sequelize.BOOLEAN, allowNull: false },
      question_eighteen: { type: Sequelize.BOOLEAN, allowNull: false },
      question_nineteen: { type: Sequelize.BOOLEAN, allowNull: false },
      question_twenty: { type: Sequelize.BOOLEAN, allowNull: false },
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
    await queryInterface.dropTable('eligibility_status');
  }
};

