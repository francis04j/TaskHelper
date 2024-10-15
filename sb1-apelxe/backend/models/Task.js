import { v4 as uuidv4 } from 'uuid';

const Task = {
  tableName: 'Tasks',
  create: (taskData) => {
    return {
      ...taskData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },
};

export default Task;