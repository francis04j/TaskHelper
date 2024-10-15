import express from 'express';
import { PutCommand, GetCommand, QueryCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import docClient from '../config/dynamodb.js';
import Task from '../models/Task.js';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const command = new QueryCommand({
      TableName: Task.tableName,
      IndexName: "StatusIndex",
      KeyConditionExpression: "#status = :status",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":status": "open",
      },
    });
    const { Items } = await docClient.send(command);
    res.json(Items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific task
router.get('/:id', async (req, res) => {
  try {
    const command = new GetCommand({
      TableName: Task.tableName,
      Key: { id: req.params.id },
    });
    const { Item } = await docClient.send(command);
    if (!Item) return res.status(404).json({ message: 'Task not found' });
    res.json(Item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    const newTask = Task.create(req.body);
    const command = new PutCommand({
      TableName: Task.tableName,
      Item: newTask,
    });
    await docClient.send(command);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a task
router.patch('/:id', async (req, res) => {
  try {
    const { title, description, location, dueDate, budget, status } = req.body;
    const command = new UpdateCommand({
      TableName: Task.tableName,
      Key: { id: req.params.id },
      UpdateExpression: "set title = :title, description = :description, #loc = :location, dueDate = :dueDate, budget = :budget, #status = :status, updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        "#loc": "location",
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":title": title,
        ":description": description,
        ":location": location,
        ":dueDate": dueDate,
        ":budget": budget,
        ":status": status,
        ":updatedAt": new Date().toISOString(),
      },
      ReturnValues: "ALL_NEW",
    });
    const { Attributes } = await docClient.send(command);
    res.json(Attributes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const command = new DeleteCommand({
      TableName: Task.tableName,
      Key: { id: req.params.id },
    });
    await docClient.send(command);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;