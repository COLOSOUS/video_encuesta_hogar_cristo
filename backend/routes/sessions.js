import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import mysql from 'mysql2/promise';
import { executeQuery } from '../config/database.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'formulariohc2',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${req.params.sessionId}-${req.params.questionId}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Initialize or resume session
router.post('/init', async (req, res) => {
  const { rut } = req.body;
  const connection = await executeQuery('START TRANSACTION');

  try {
    // Check for existing incomplete session
    const existingSessions = await executeQuery(
      'SELECT * FROM sessions WHERE rut = ? AND completed = false ORDER BY created_at DESC LIMIT 1',
      [rut]
    );

    console.log('existingSessions:', existingSessions); // Debug

    if (Array.isArray(existingSessions) && existingSessions.length > 0) {
      const session = existingSessions[0];

      // Get answers
      const answers = await executeQuery(
        'SELECT question_id, answer FROM answers WHERE session_id = ?',
        [session.id]
      );

      // Get videos
      const videos = await executeQuery(
        'SELECT question_id, video_path FROM videos WHERE session_id = ?',
        [session.id]
      );

      await executeQuery('COMMIT');

      return res.json({
        sessionId: session.id,
        currentStep: session.progress,
        answers: answers.reduce((acc, curr) => {
          acc[curr.question_id] = JSON.parse(curr.answer);
          return acc;
        }, {}),
        videos: videos.map(v => ({
          questionId: v.question_id,
          path: v.video_path
        }))
      });
    }

    // Si no existe una sesión previa, se crea una nueva
    await executeQuery('SET FOREIGN_KEY_CHECKS = 0;');
    const result = await executeQuery(
      'INSERT INTO sessions (rut, progress) VALUES (?, 0)',
      [rut]
    );

    await executeQuery('COMMIT');

    res.json({
      sessionId: result.insertId,
      currentStep: 0,
      answers: {},
      videos: []
    });

  } catch (error) {
    await executeQuery('ROLLBACK');
    console.error('Error in session initialization:', error);
    res.status(500).json({ error: 'Error initializing session' });
  }
});

// Update session progress
router.post('/:sessionId/progress', async (req, res) => {
  const { sessionId } = req.params;
  const { step } = req.body;

  try {
    await executeQuery(
      'UPDATE sessions SET progress = ?, last_active = CURRENT_TIMESTAMP WHERE id = ?',
      [step, sessionId]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Error updating progress' });
  }
});
// Save video response
router.post('/:sessionId/videos/:questionId', upload.single('video'), async (req, res) => {
  const { sessionId, questionId } = req.params;
  const videoPath = req.file.filename;

  try {
    await executeQuery('SET FOREIGN_KEY_CHECKS = 0;');
    await executeQuery(
      'INSERT INTO videos (session_id, question_id, video_path) VALUES (?, ?, ?) ' +
      'ON DUPLICATE KEY UPDATE video_path = ?',
      [sessionId, questionId, videoPath, videoPath]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error saving video:', error);
    res.status(500).json({ error: 'Error saving video' });
  }
});

// Save answer
router.post('/:sessionId/answers', async (req, res) => {
  const { sessionId } = req.params;
  const { questionId, answer } = req.body;

  try { await executeQuery('SET FOREIGN_KEY_CHECKS = 0;');
    await executeQuery(
      
      'INSERT INTO answers (session_id, question_id, answer) VALUES (?, ?, ?) ' +
      'ON DUPLICATE KEY UPDATE answer = ?',
      [sessionId, questionId, JSON.stringify(answer), JSON.stringify(answer)]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error saving answer:', error);
    res.status(500).json({ error: 'Error saving answer' });
  }
});

// Get latest session
router.get('/:rut/latest', async (req, res) => {
  const { rut } = req.params;

  try {
    const [sessions] = await executeQuery(
      'SELECT * FROM sessions WHERE rut = ? AND completed = false ORDER BY created_at DESC LIMIT 1',
      [rut]
    );

    if (sessions.length === 0) {
      return res.status(404).json({ error: 'No session found' });
    }

    const session = sessions[0];

    // Get answers
    const [answers] = await executeQuery(
      'SELECT question_id, answer FROM answers WHERE session_id = ?',
      [session.id]
    );

    // Get videos
    const [videos] = await executeQuery(
      'SELECT question_id, video_path FROM videos WHERE session_id = ?',
      [session.id]
    );

    res.json({
      sessionId: session.id,
      currentStep: session.progress,
      answers: answers.reduce((acc, curr) => {
        acc[curr.question_id] = JSON.parse(curr.answer);
        return acc;
      }, {}),
      videos: videos.map(v => ({
        questionId: v.question_id,
        path: v.video_path
      }))
    });
  } catch (error) {
    console.error('Error getting session:', error);
    res.status(500).json({ error: 'Error getting session' });
  }
});

export default router;