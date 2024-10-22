import express from 'express';
import db from '../config/inMemoryDb.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Get all tasks
router.get('/', (req, res) => {
  const tasksWithDetails = db.tasks;
  //db.tasks.map(task => {
   // const offers = db.offers.filter(offer => offer.taskId === task.id);
   // const questions = db.questions.filter(question => question.taskId === task.id);
    //return { ...task, offers, questions };
    
  //});
  console.log('tasksWithDetails', tasksWithDetails)
  res.json(tasksWithDetails);
});

// Get a specific task
router.get('/:id', (req, res) => {
  const task = db.tasks.find(task => task.id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  
  const offers = db.offers.filter(offer => offer.taskId === task.id);
  const questions = db.questions.filter(question => question.taskId === task.id).map(question => {
    const replies = db.replies.filter(reply => reply.questionId === question.id);
    return { ...question, replies };
  });
  
  res.json({ ...task, offers, questions });
});

// Create a new task
router.post('/', (req, res) => {
  const { title, description, location, dueDate, budget, isOnline } = req.body;
  console.log('POSTER', poster)
  // Validate required fields
  if (!title) {
    return res.status(400).json({ message: 'Missing required fields title' });
  }

  if (isOnline == false && !location) {
    return res.status(400).json({ message: 'Missing required field: Location' });
  }

  if (!dueDate ) {
    return res.status(400).json({ message: 'Missing required field: DueDate' });
  }

  if (!budget) {
    return res.status(400).json({ message: 'Missing required field: Budget' });
  }

  const newTask = {
    id: uuidv4(),
    title,
    description,
    location,
    lat: req.body.lat? parseFloat(req.body.lat) : null,
    lng: req.body.lng? parseFloat(req.body.lng) : null,
    dueDate,
    budget: parseFloat(budget),
    isOnline: isOnline === 'true',
    images: req.files,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'OPEN',
    poster: req.poster,
    offers: [],
    questions: []
  };

  db.tasks.push(newTask);
  res.status(201).json(newTask);
});
// Create a new offer
router.post('/:id/offers', (req, res) => {
  const taskId = req.params.id;
  const newOffer = {
    id: uuidv4(),
    taskId,
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  db.offers.push(newOffer);
  res.status(201).json(newOffer);
});

// Create a new question
router.post('/:id/questions', (req, res) => {
  const taskId = req.params.id;
  const newQuestion = {
    id: uuidv4(),
    taskId,
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  db.questions.push(newQuestion);
  res.status(201).json(newQuestion);
});

// Create a new reply
router.post('/:taskId/questions/:questionId/replies', (req, res) => {
  const questionId = req.params.questionId;
  const newReply = {
    id: uuidv4(),
    questionId,
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  db.replies.push(newReply);
  res.status(201).json(newReply);
});

export default router;