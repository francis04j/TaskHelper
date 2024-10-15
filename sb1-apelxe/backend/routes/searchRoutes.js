import express from 'express';
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import docClient from '../config/dynamodb.js';
import Task from '../models/Task.js';

const router = express.Router();

// Search tasks
router.get('/', async (req, res) => {
  const { q } = req.query;
  try {
    const command = new QueryCommand({
      TableName: Task.tableName,
      IndexName: "TitleIndex",
      KeyConditionExpression: "begins_with(title, :searchTerm)",
      ExpressionAttributeValues: {
        ":searchTerm": q,
      },
      Limit: 10,
    });
    const { Items } = await docClient.send(command);
    res.json(Items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;