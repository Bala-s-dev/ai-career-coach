// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'; // <-- Import auth routes

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Mount the routers
app.use('/api/auth', authRoutes); // <-- Use auth routes

// Simple route for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend! 👋' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
