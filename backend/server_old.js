import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Cargar las variables de entorno
dotenv.config();

// Crear el pool de conexiones con la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'formulariohc2',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Crear aplicación Express
const app = express();
app.use(express.json());

// Configurar CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// Configurar carpeta de carga
const uploadDir = path.join('uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configurar Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post('/api/submit', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { rut } = req.body;

    if (!rut) {
      return res.status(400).json({ error: 'Missing required field: rut' });
    }

    // Verificar si ya existe un registro con ese rut
    const [[existingSubmission]] = await connection.query(
      'SELECT id FROM submissions WHERE rut = ?',
      [rut]
    );

    if (existingSubmission) {
      return res.json({ message: 'Rut already exists', submissionId: existingSubmission.id });
    }

    // Insertar nuevo registro si no existe
    const [result] = await connection.query(
      'INSERT INTO submissions (rut) VALUES (?)',
      [rut]
    );

    res.json({ message: 'Rut submitted successfully', submissionId: result.insertId });
  } catch (error) {
    console.error('Error submitting rut:', error);
    res.status(500).json({ error: 'Error submitting rut' });
  } finally {
    connection.release();
  }
});

// Ruta para manejar el envío final del formulario
app.post(
  '/api/submit-final',
  upload.any(),
  async (req, res) => {
    const connection = await pool.getConnection();
    try {
      const { submissionId, answers, additionalData } = req.body;
      const files = req.files;

      if (!submissionId || !answers) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      let parsedAnswers;
      try {
        parsedAnswers = JSON.parse(answers);
      } catch {
        return res.status(400).json({ error: 'Invalid answers format' });
      }

      // Verificar si el submissionId existe
      const [[exists]] = await connection.query(
        'SELECT id FROM submissions WHERE id = ?',
        [submissionId]
      );

      if (!exists) {
        return res.status(400).json({ error: 'Invalid submission ID' });
      }

      await connection.query('START TRANSACTION');

      try {
        // Guardar videos (sobreescribe si ya existen)
        for (const file of files) {
          const questionId = file.fieldname.split('_')[1];
          await connection.query(
            `INSERT INTO videos (submission_id, question_id, video_path) 
             VALUES (?, ?, ?) 
             ON DUPLICATE KEY UPDATE video_path = VALUES(video_path);`,
            [submissionId, questionId, file.filename]
          );
        }

        // Guardar respuestas (sobreescribe si ya existen)
        for (const [questionId, answer] of Object.entries(parsedAnswers)) {
          await connection.query(
            `INSERT INTO answers (submission_id, question_id, answer) 
             VALUES (?, ?, ?) 
             ON DUPLICATE KEY UPDATE answer = VALUES(answer);`,
            [submissionId, questionId, JSON.stringify(answer)]
          );
        }

        // Manejo de datos adicionales
        if (additionalData) {
          try {
            const parsedAdditionalData = JSON.parse(additionalData);
            for (const [key, value] of Object.entries(parsedAdditionalData)) {
              await connection.query(
                `INSERT INTO additional_data (submission_id, key, value) 
                 VALUES (?, ?, ?) 
                 ON DUPLICATE KEY UPDATE value = VALUES(value);`,
                [submissionId, key, JSON.stringify(value)]
              );
            }
          } catch (error) {
            return res.status(400).json({ error: 'Invalid additional data format' });
          }
        }

        // Marcar la sesión como completada
        await connection.query('UPDATE sessions SET completed = 1 WHERE rut = (SELECT rut FROM submissions WHERE id = ?)', [submissionId]);

        await connection.query('COMMIT');
        res.json({ message: 'Final form submitted successfully' });
      } catch (error) {
        await connection.query('ROLLBACK');
        throw error;
      }
    } catch (error) {
      console.error('Error submitting final form:', error);
      res.status(500).json({ error: 'Error submitting final form' });
    } finally {
      connection.release();
    }
  }
);

// Iniciar servidor
const PORT = 3500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Endpoint para cerrar el servidor de forma segura
app.post('/shutdown', (req, res) => {
  console.log('Solicitud de cierre del servidor recibida.');
  res.status(200).send('Servidor se está cerrando...');
  process.exit(0);
});
