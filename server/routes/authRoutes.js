// server/routes/authRoutes.js
import express from 'express';

const router = express.Router();

// @desc    Placeholder to get current user
// @route   GET /api/auth/user
// @access  Public (for now)
router.get('/user', (req, res) => {
  // In the future, this will be a protected route
  // and will return the actual logged-in user's data.
  res.json({
    id: '12345',
    displayName: 'John Doe (Test)',
    email: 'john.doe@example.com',
  });
});

export default router;
