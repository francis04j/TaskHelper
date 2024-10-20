import express from 'express';
import db from '../config/inMemoryDb.js';

const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  const usersWithoutPasswords = db.users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
  res.json(usersWithoutPasswords);
});

// Get a specific user
router.get('/:id', (req, res) => {
  const user = db.users.find(user => user.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Update a user
router.patch('/:id', (req, res) => {
  const index = db.users.findIndex(user => user.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  const updatedUser = {
    ...db.users[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  // Ensure that sensitive information is not overwritten
  delete updatedUser.password;

  db.users[index] = updatedUser;
  
  // Remove sensitive information before sending the response
  const { password, ...userWithoutPassword } = updatedUser;
  res.json(userWithoutPassword);
});

// Delete a user
router.delete('/:id', (req, res) => {
  const index = db.users.findIndex(user => user.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  db.users.splice(index, 1);
  res.json({ message: 'User deleted' });
});



export default router;