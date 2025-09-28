// server/middleware/authMiddleware.js
export const protect = (req, res, next) => {
  if (req.isAuthenticated()) {
    // isAuthenticated() is a Passport function
    return next();
  }
  res.status(401).json({ message: 'Not authorized, please log in.' });
};
