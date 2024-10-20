import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/inMemoryDb.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    // Check if user already exists
    const existingUser = db.users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      userType,
      createdAt: new Date().toISOString(),
    };
    db.users.push(newUser);

    // Create and return JWT
    const token = "random"; //jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email, userType: newUser.userType } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = db.users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }

    // Create and return JWT
    const token = "random"; //TODO:jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, userType: user.userType } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;