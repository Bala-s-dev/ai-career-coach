// server/routes/resumeRoutes.js
import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';
import PDF from 'pdf-ts';
import { analyzeResume, generateJobQueryFromResume } from '../services/aiService.js'; 

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/analyze', protect, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }
    const { jobDescription } = req.body;
    const extractedText = await PDF.pdfToText(req.file.buffer);
    const analysisResult = await analyzeResume(extractedText, jobDescription);

    res.json({ analysis: analysisResult, extractedText: extractedText });

  } catch (error) {
    console.error('Error parsing PDF:', error);
    res.status(500).json({ message: 'Error processing file.' });
  }
});

router.post('/generate-job-query', protect, async (req, res) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) {
      return res.status(400).json({ message: 'Resume text is required.' });
    }
    const query = await generateJobQueryFromResume(resumeText);
    res.json({ query });
  } catch (error) {
    console.error('Error in /generate-job-query route:', error);
    res.status(500).json({ message: 'Failed to generate job query.' });
  }
});

export default router;
