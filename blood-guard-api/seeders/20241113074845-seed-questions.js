'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    await queryInterface.bulkInsert('Questions', [
      {
        question_text: "Are you between the ages of 18 and 65?",
        disqualification_type: "None",
        waiting_period_months: 0,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Do you weigh at least 50 kg (110 lbs)?",
        disqualification_type: "None",
        waiting_period_months: 0,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Have you donated blood in the last three months?",
        disqualification_type: "Temporary",
        waiting_period_months: 3,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Are you feeling healthy and well today?",
        disqualification_type: "None",
        waiting_period_months: 0,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Are you currently taking any antibiotics?",
        disqualification_type: "Temporary",
        waiting_period_months: 1,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Have you had any vaccinations in the past 4 weeks?",
        disqualification_type: "Temporary",
        waiting_period_months: 1,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Are you currently on any medication that could affect your blood?",
        disqualification_type: "Temporary",
        waiting_period_months: 1,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Have you had a recent tattoo, piercing, or acupuncture in the past 6 months?",
        disqualification_type: "Temporary",
        waiting_period_months: 6,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Have you had a major surgery in the past year?",
        disqualification_type: "Temporary",
        waiting_period_months: 12,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Do you have a history of hepatitis B, hepatitis C, or HIV/AIDS?",
        disqualification_type: "Permanent",
        waiting_period_months: 0,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Have you ever tested positive for HIV?",
        disqualification_type: "Permanent",
        waiting_period_months: 0,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Have you traveled outside your country in the past 12 months?",
        disqualification_type: "Temporary",
        waiting_period_months: 12,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Have you experienced unexplained weight loss in recent months?",
        disqualification_type: "Temporary",
        waiting_period_months: 3,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Do you currently have a cold, flu, or any other active infection?",
        disqualification_type: "Temporary",
        waiting_period_months: 1,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Do you have a history of malaria or other blood-borne diseases?",
        disqualification_type: "Permanent",
        waiting_period_months: 0,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Have you had any dental surgery or treatment within the last 24 hours?",
        disqualification_type: "Temporary",
        waiting_period_months: 1,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Are you pregnant, or have you been pregnant within the past six months?",
        disqualification_type: "Temporary",
        waiting_period_months: 6,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Do you have a bleeding disorder (e.g., hemophilia)?",
        disqualification_type: "Permanent",
        waiting_period_months: 0,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Have you received a blood transfusion in the past year?",
        disqualification_type: "Temporary",
        waiting_period_months: 12,
        created_at: now,
        updated_at: now
      },
      {
        question_text: "Do you consume alcohol within 24 hours of donating blood?",
        disqualification_type: "Temporary",
        waiting_period_months: 1,
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Questions', null, {});
  }
};

