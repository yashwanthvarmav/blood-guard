const models = require('../models');

async function getQuestionsController(req, res) {
    try {
        const questions = await models.Question.findAll({
            attributes: ['id', 'question_text', 'disqualification_type', 'waiting_period_months']
        });
        
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'An error occurred while fetching questions' });
    }
}

module.exports = {
    getQuestionsController
};
