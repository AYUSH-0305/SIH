import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import institutionRouter from './routes/institutions.js';
import studentsRouter from './routes/students.js';
import uploadRouter from './routes/upload.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sih_main';

async function start() {
  try {
    await mongoose.connect(mongoUri, { dbName: 'sih_main' });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }

  app.get('/', (req, res) => {
    res.json({ ok: true, service: 'sih-backend' });
  });

  app.use('/api/institutions', institutionRouter);
  app.use('/api/students', studentsRouter);
  app.use('/api/upload', uploadRouter);

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`API listening on :${port}`));
}

start();


