import express from 'express';
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import docClient from '../config/dynamodb.js';
import User from '../models/User.js';

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    // Check if user already exists
    const existingUser = await docClient.send(new GetCommand({
      TableName: User.tableName,
      Key: { email },
    }));

    if (existingUser.Item) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = User.create({ name, email, password: hashedPassword, userType });
    await docClient.send(new PutCommand({
      TableName: User.tableName,
      Item: newUser,
    }));

    // Create and return JWT
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
    const { Item: user } = await docClient.send(new GetCommand({
      TableName: User.tableName,
      Key: { email },
    }));

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and return JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, userType: user.userType } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;