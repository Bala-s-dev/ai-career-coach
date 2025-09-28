// server/routes/authRoutes.js
import express from 'express';
import passport from 'passport';

const router = express.Router();

// @desc    Authenticate with Google
// @route   GET /api/auth/google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @desc    Google auth callback
// @route   GET /api/auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
  }),
  (req, res) => {
    // Successful authentication, redirect to the dashboard.
    res.redirect('http://localhost:5173/dashboard');
  }
);

// @desc    Get current logged-in user
// @route   GET /api/auth/user
router.get('/user', (req, res) => {
  res.send(req.user); // req.user is populated by Passport's deserializeUser
});

// @desc    Logout user
// @route   GET /api/auth/logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('http://localhost:5173/'); // Redirect to homepage after logout
  });
});

export default router;
