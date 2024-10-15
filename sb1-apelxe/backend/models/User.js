import { v4 as uuidv4 } from 'uuid';

const User = {
  tableName: 'Users',
  create: (userData) => {
    return {
      ...userData,
      id: uuidv4(),
      rating: 0,
      tasksCompleted: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },
};

export default User;