import express from 'express';
import { executeQuery } from '../config/database';
import multer from 'multer';


export const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Submit form data
router.post('/submit', upload.array('videos'), async (req, res) => {
  try {
    const { rut, answers } = req.body;
    const files = req.files as Express.Multer.File[];

    // Start transaction
    const conn = await executeQuery('START TRANSACTION');

    try {
      // Insert submission
      const [submissionResult]: any = await executeQuery(
        'INSERT INTO submissions (rut) VALUES (?)',
        [rut]
      );

      const submissionId = submissionResult.insertId;

      // Insert videos
      for (const file of files) {
        const questionId = file.fieldname.split('_')[1];
        await executeQuery(
          'INSERT INTO videos (submission_id, question_id, video_path) VALUES (?, ?, ?)',
          [submissionId, questionId, file.filename]
        );
      }

      // Insert answers
      const parsedAnswers = JSON.parse(answers);
      for (const [questionId, answer] of Object.entries(parsedAnswers)) {
        await executeQuery(
          'INSERT INTO answers (submission_id, question_id, answer) VALUES (?, ?, ?)',
          [submissionId, questionId, JSON.stringify(answer)]
        );
      }

      await executeQuery('COMMIT');
      res.json({ message: 'Form submitted successfully' });
    } catch (error) {
      await executeQuery('ROLLBACK');
      throw error;
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Error submitting form' });
  }
});