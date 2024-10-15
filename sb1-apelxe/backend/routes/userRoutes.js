import express from 'express';
import { PutCommand, GetCommand, QueryCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import docClient from '../config/dynamodb.js';
import User from '../models/User.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const command = new QueryCommand({
      TableName: User.tableName,
    });
    const { Items } = await docClient.send(command);
    res.json(Items.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific user
router.get('/:id', async (req, res) => {
  try {
    const command = new GetCommand({
      TableName: User.tableName,
      Key: { id: req.params.id },
    });
    const { Item } = await docClient.send(command);
    if (!Item) return res.status(404).json({ message: 'User not found' });
    const { password, ...userWithoutPassword } = Item;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = User.create(req.body);
    const command = new PutCommand({
      TableName: User.tableName,
      Item: newUser,
    });
    await docClient.send(command);
    const { password, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a user
router.patch('/:id', async (req, res) => {
  try {
    const { name, email, location, bio, skills } = req.body;
    const command = new UpdateCommand({
      TableName: User.tableName,
      Key: { id: req.params.id },
      UpdateExpression: "set #name = :name, email = :email, #loc = :location, bio = :bio, skills = :skills, updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        "#name": "name",
        "#loc": "location",
      },
      ExpressionAttributeValues: {
        ":name": name,
        ":email": email,
        ":location": location,
        ":bio": bio,
        ":skills": skills,
        ":updatedAt": new Date().toISOString(),
      },
      ReturnValues: "ALL_NEW",
    });
    const { Attributes } = await docClient.send(command);
    const { password, ...userWithoutPassword } = Attributes;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const command = new DeleteCommand({
      TableName: User.tableName,
      Key: { id: req.params.id },
    });
    await docClient.send(command);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;