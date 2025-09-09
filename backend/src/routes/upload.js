import { Router } from 'express';
import multer from 'multer';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Institution from '../models/Institution.js';
import Student from '../models/Student.js';

const router = Router();
const upload = multer({ dest: 'uploads/' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runPythonConverter(pdfFilePath, columnMapping) {
  return new Promise((resolve, reject) => {
    const testingDir = path.resolve(__dirname, '../../../testingcompo');
    const wrapperPath = path.join(testingDir, 'python_wrapper.py');
    const absPdfPath = path.isAbsolute(pdfFilePath)
      ? pdfFilePath
      : path.resolve(process.cwd(), pdfFilePath);

    // Prefer virtualenv python if available
    const venvPy = path.join(testingDir, '.venv', 'bin', 'python');
    const pythonExec = fs.existsSync(venvPy) ? venvPy : 'python3';

    const args = [
      wrapperPath,
      absPdfPath,
      columnMapping ? JSON.stringify(columnMapping) : ''
    ];

    const py = spawn(pythonExec, args, { cwd: testingDir });

    let stdout = '';
    let stderr = '';
    py.stdout.on('data', d => (stdout += d.toString()));
    py.stderr.on('data', d => (stderr += d.toString()));
    py.on('close', code => {
      if (code !== 0) return reject(new Error(stderr || `Python exited ${code}`));
      try {
        const parsed = JSON.parse(stdout);
        resolve(parsed);
      } catch (e) {
        reject(new Error('Invalid JSON from converter'));
      }
    });
  });
}

router.post('/pdf', upload.single('file'), async (req, res) => {
  try {
    const { institutionCode, columnMapping } = req.body;
    if (!req.file) return res.status(400).json({ error: 'PDF file is required' });
    if (!institutionCode) return res.status(400).json({ error: 'institutionCode is required' });

    const institution = await Institution.findOne({ code: institutionCode });
    if (!institution) return res.status(404).json({ error: 'Institution not found' });

    const mapping = columnMapping ? JSON.parse(columnMapping) : undefined;
    const result = await runPythonConverter(req.file.path, mapping);
    if (!Array.isArray(result)) return res.status(500).json({ error: 'Converter returned invalid data' });

    const bulkOps = result.map(s => ({
      updateOne: {
        filter: { institution: institution._id, Rno: s.Rno },
        update: { $set: { institution: institution._id, Rno: s.Rno, Jno: s.Jno, CN: s.CN, B: s.B, Sec: s.Sec } },
        upsert: true
      }
    }));

    if (bulkOps.length > 0) await Student.bulkWrite(bulkOps);

    res.json({ success: true, insertedOrUpdated: bulkOps.length });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to process PDF' });
  } finally {
    if (req.file && req.file.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
  }
});

router.post('/pdf-columns', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'PDF file is required' });
    const testingDir = path.resolve(__dirname, '../../../testingcompo');
    const wrapperPath = path.join(testingDir, 'python_wrapper.py');

    const absPdfPath = path.isAbsolute(req.file.path) ? req.file.path : path.resolve(process.cwd(), req.file.path);
    const venvPy = path.join(testingDir, '.venv', 'bin', 'python');
    const pythonExec = fs.existsSync(venvPy) ? venvPy : 'python3';

    const args = [wrapperPath, 'columns', absPdfPath];
    const py = spawn(pythonExec, args, { cwd: testingDir });
    let stdout = '';
    let stderr = '';
    py.stdout.on('data', d => (stdout += d.toString()));
    py.stderr.on('data', d => (stderr += d.toString()));
    py.on('close', code => {
      if (req.file && req.file.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      if (code !== 0) return res.status(500).json({ error: stderr || `Python exited ${code}` });
      try {
        const cols = JSON.parse(stdout);
        return res.json({ success: true, columns: Array.isArray(cols) ? cols : [] });
      } catch {
        return res.status(500).json({ error: 'Invalid JSON from converter' });
      }
    });
  } catch (err) {
    if (req.file && req.file.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: err.message || 'Failed to read columns' });
  }
});

export default router;


