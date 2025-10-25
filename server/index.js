// server/index.js
// import dotenv from 'dotenv';
// dotenv.config();
// console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import connectDB from './config/db.js';
import './config/passport.js'; 
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';

connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use(express.json());

// Session Middleware

app.use(
  session({
    secret: process.env.COOKIE_KEY, 
    resave: false, 
    saveUninitialized: false, 
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/api/auth', authRoutes); 
app.use('/api/resume', resumeRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/interview', interviewRoutes);

// // Simple route for testing
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'Hello from the backend! 👋' });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
