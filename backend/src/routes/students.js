import { Router } from 'express';
import Student from '../models/Student.js';

const router = Router();

router.get('/', async (req, res) => {
  const { institutionId, q, field } = req.query;
  const filter = {};
  if (institutionId) filter.institution = institutionId;

  if (q) {
    const regex = new RegExp(q, 'i');
    if (field && ['Rno', 'Jno', 'CN', 'B', 'Sec'].includes(field)) {
      filter[field] = regex;
    } else {
      filter.$or = [
        { Rno: regex },
        { Jno: regex },
        { CN: regex },
        { B: regex },
        { Sec: regex }
      ];
    }
  }

  const students = await Student.find(filter).limit(1000).sort({ createdAt: -1 });
  res.json({ count: students.length, data: students });
});

export default router;


