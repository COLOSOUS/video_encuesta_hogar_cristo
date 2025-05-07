import express from 'express';
import cors from 'cors';

import multer from 'multer';
import mysql from 'mysql2/promise';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import sessionsRouter from './routes/sessions.js';

dotenv.config();

const app = express();
const port = 3500;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
try {
  await fs.mkdir(uploadDir, { recursive: true });
} catch (err) {
  console.error('Error creating uploads directory:', err);
}

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'formulariohc2',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// Configurar CORS

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/sessions', sessionsRouter);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});