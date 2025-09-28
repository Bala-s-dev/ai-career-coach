// server/routes/resumeRoutes.js
import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';
import PDF from 'pdf-ts';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/analyze', protect, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }
    
    const extractedText = await PDF.pdfToText(req.file.buffer);

    res.json({
      message: 'PDF parsed successfully!',
      extractedText: extractedText,
    });
  } catch (error) {
    console.error('Error parsing PDF:', error);
    res.status(500).json({ message: 'Error processing file.' });
  }
});

export default router;
