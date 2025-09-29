// server/routes/jobRoutes.js
import express from 'express';
import axios from 'axios';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Search for jobs
// @route   GET /api/jobs/search
// @access  Private
router.get(
  '/search',
  /* protect, */ async (req, res) => {
    const { query, page = '1' } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required.' });
    }

    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query: query,
        page: page,
        num_pages: '1',
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      res.json(response.data.data); // The jobs are in the 'data' property of the response
    } catch (error) {
      console.error('Error fetching jobs from JSearch API:', error);
      res.status(500).json({ message: 'Failed to fetch jobs.' });
    }
  }
);

export default router;
