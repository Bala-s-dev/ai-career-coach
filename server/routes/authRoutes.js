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
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

// @desc    Get current logged-in user
// @route   GET /api/auth/user
router.get('/user', (req, res) => {
  res.send(req.user); 
});

// @desc    Logout user
// @route   GET /api/auth/logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(`${process.env.CLIENT_URL}/`); 
  });
});

export default router;
