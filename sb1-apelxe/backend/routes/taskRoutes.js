import express from 'express';
import db from '../config/inMemoryDb.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Get all tasks
router.get('/', (req, res) => {
  res.json(db.tasks);
});

// Get a specific task
router.get('/:id', (req, res) => {
  const task = db.tasks.find(task => task.id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// Create a new task
router.post('/', (req, res) => {
  const newTask = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
router.patch('/:id', (req, res) => {
  const index = db.tasks.findIndex(task => task.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Task not found' });

  db.tasks[index] = {
    ...db.tasks[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  res.json(db.tasks[index]);
});

// Delete a task
router.delete('/:id', (req, res) => {
  const index = db.tasks.findIndex(task => task.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Task not found' });

  db.tasks.splice(index, 1);
  res.json({ message: 'Task deleted' });
});

export default router;