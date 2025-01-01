const models = require('../models');
const { sendEligibilityEmail } = require('../helpers/mailservice');
const { Op } = require('sequelize');
const moment = require('moment');

// Define eligibility rules
const eligibilityRules = {
    question_one: { disqualification_type: 'Permanent', condition: false, comment: 'Age eligibility' },
    question_two: { disqualification_type: 'Permanent', condition: false, comment: 'Weight eligibility' },
    question_three: { disqualification_type: 'Temporary', waiting_period_months: 3, condition: true, comment: 'Recent blood donation' },
    question_four: { disqualification_type: 'None', condition: true, comment: 'Health condition today' },
    question_five: { disqualification_type: 'Temporary', waiting_period_months: 1, condition: true, comment: 'Antibiotics usage' },
    question_six: { disqualification_type: 'Temporary', waiting_period_months: 1, condition: true, comment: 'Vaccination' },
    question_seven: { disqualification_type: 'Temporary', waiting_period_months: 1, condition: true, comment: 'Medication' },
    question_eight: { disqualification_type: 'Temporary', waiting_period_months: 6, condition: true, comment: 'Recent tattoo or piercing' },
    question_nine: { disqualification_type: 'Temporary', waiting_period_months: 12, condition: true, comment: 'Major surgery' },
    question_ten: { disqualification_type: 'Permanent', condition: true, comment: 'Hepatitis B/C or HIV/AIDS' },
    question_eleven: { disqualification_type: 'Permanent', condition: true, comment: 'HIV positive' },
    question_twelve: { disqualification_type: 'Temporary', waiting_period_months: 12, condition: true, comment: 'Recent travel' },
    question_thirteen: { disqualification_type: 'Temporary', waiting_period_months: 3, condition: true, comment: 'Unexplained weight loss' },
    question_fourteen: { disqualification_type: 'Temporary', waiting_period_months: 1, condition: true, comment: 'Cold or infection' },
    question_fifteen: { disqualification_type: 'Permanent', condition: true, comment: 'Malaria or blood-borne diseases' },
    question_sixteen: { disqualification_type: 'Temporary', waiting_period_months: 1, condition: true, comment: 'Recent dental work' },
    question_seventeen: { disqualification_type: 'Temporary', waiting_period_months: 6, condition: true, comment: 'Pregnancy' },
    question_eighteen: { disqualification_type: 'Permanent', condition: true, comment: 'Bleeding disorder' },
    question_nineteen: { disqualification_type: 'Temporary', waiting_period_months: 12, condition: true, comment: 'Blood transfusion' },
    question_twenty: { disqualification_type: 'Temporary', waiting_period_months: 1, condition: true, comment: 'Alcohol consumption within 24 hours' }
};

async function processEligibilityController(req, res) {
    const { user_id, answers } = req.body;

    try {
        // Default eligibility is "Eligible"
        let eligibility = 'Eligible';
        let disqualification_reasons = []; // Array to store all reasons
        let disqualification_end_date = null;
        let next_eligibility_check = null;

        // Evaluate each question to determine eligibility
        for (const [question, answer] of Object.entries(answers)) {
            const rule = eligibilityRules[question];

            // Check if the rule applies and if the answer meets the disqualification condition
            if (rule && answer === rule.condition) {
                // Set eligibility type
                if (rule.disqualification_type === 'Permanent') {
                    eligibility = 'Permanent Disqualification';
                    disqualification_reasons.push(`${question}: ${rule.comment}`);
                    disqualification_end_date = null; // No end date for permanent disqualification
                    next_eligibility_check = null; // No next check needed for permanent disqualification
                } else if (rule.disqualification_type === 'Temporary') {
                    if (eligibility !== 'Permanent Disqualification') {
                        eligibility = 'Temporary Disqualification'; // Temporary is overridden by Permanent
                    }
                    disqualification_reasons.push(`${question}: ${rule.comment}`);
                    const tempEndDate = moment().add(rule.waiting_period_months, 'months').toDate();

                    // Keep the maximum (farthest) disqualification_end_date for temporary reasons
                    if (!disqualification_end_date || tempEndDate > disqualification_end_date) {
                        disqualification_end_date = tempEndDate;
                        next_eligibility_check = disqualification_end_date;
                    }
                }
            }
        }

        // If there are no disqualification reasons, set eligibility as "Eligible"
        if (disqualification_reasons.length === 0) {
            eligibility = 'Eligible';
            disqualification_end_date = null;
            next_eligibility_check = null;
        }

        // Save the eligibility status and answers in the database
        const eligibilityStatus = await models.EligibilityStatus.create({
            user_id,
            eligibility,
            disqualification_type: disqualification_reasons.join(', '), // Store all reasons as a comma-separated string
            disqualification_end_date,
            next_eligibility_check,
            ...answers // Save each question's answer in the record
        });

        // Update the User table with the eligibility status
        await models.User.update(
            {
                eligibility,
                disqualification_type: disqualification_reasons.join(', '),
                next_eligibility_check,
                updated_at: new Date() // Automatically set the updated_at timestamp
            },
            {
                where: { id: user_id } // Update based on the user_id
            }
        );

        // Send an email notification to the user about their eligibility
        await sendEligibilityEmail(user_id, eligibility, disqualification_reasons, disqualification_end_date);

        res.status(201).json({
            message: 'Eligibility processed successfully',
            eligibilityStatus
        });
    } catch (error) {
        console.error('Error processing eligibility:', error);
        res.status(500).json({ error: 'An error occurred while processing eligibility' });
    }
}

module.exports = {
    processEligibilityController
};
