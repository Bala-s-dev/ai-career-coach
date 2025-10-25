import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { generateInterviewQuestions , getAnswerFeedback} from '../services/aiService.js';

const router = express.Router();

// @desc    Generate interview questions for a job title
// @route   POST /api/interview/questions
// @access  Private
router.post('/questions', protect, async (req, res) => {
  try {
    const { jobTitle } = req.body;
    if (!jobTitle) {
      return res.status(400).json({ message: 'Job title is required.' });
    }
    const questionsData = await generateInterviewQuestions(jobTitle);
    res.json(questionsData);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to generate interview questions.' });
  }
});

router.post('/feedback', protect, async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res
        .status(400)
        .json({ message: 'Question and answer are required.' });
    }
    const feedback = await getAnswerFeedback(question, answer);
    res.json({ feedback });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get feedback.' });
  }
});

export default router;
