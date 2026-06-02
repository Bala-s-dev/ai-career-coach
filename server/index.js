import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import MongoStore from 'connect-mongo';
import { rateLimit } from 'express-rate-limit';
import passport from 'passport';
import session from 'express-session';
import connectDB from './config/db.js';
import './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import { protect } from './middleware/authMiddleware.js'; // ADDED: Auth middleware

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
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions'
    }),
    cookie: {
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', protect, resumeRoutes);
app.use('/api/jobs', protect, jobRoutes);
app.use('/api/interview', protect, interviewRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});