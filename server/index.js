// server/index.js
// import dotenv from 'dotenv';
// dotenv.config();
// console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
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
app.use(helmet());
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5001;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, 
  legacyHeaders: false, 
});

app.use('/api', limiter);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
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
    cookie: {
      secure: true,
      sameSite: 'none', 
      maxAge: 24 * 60 * 60 * 1000 
    } 
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
