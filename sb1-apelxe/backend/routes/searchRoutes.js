import express from 'express';
import db from '../config/inMemoryDb.js';

const router = express.Router();

// Search tasks
router.get('/', (req, res) => {
  const { q } = req.query;
  const searchResults = db.tasks.filter(task =>
    task.title.toLowerCase().includes(q.toLowerCase()) ||
    task.description.toLowerCase().includes(q.toLowerCase())
  );
  res.json(searchResults);
});

export default router;