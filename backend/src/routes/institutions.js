import { Router } from 'express';
import Institution from '../models/Institution.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, code, email, contactPhone, address } = req.body;
    const inst = await Institution.create({ name, code, email, contactPhone, address });
    res.status(201).json(inst);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Institution code already exists' });
    res.status(500).json({ error: 'Failed to create institution' });
  }
});

router.get('/', async (_req, res) => {
  const list = await Institution.find().sort({ createdAt: -1 });
  res.json(list);
});

export default router;


