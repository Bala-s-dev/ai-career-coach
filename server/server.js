// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
// Enable Cross-Origin Resource Sharing
app.use(cors());
// Enable parsing of JSON data in request body
app.use(express.json());

// Simple route for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend! 👋' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
