import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
 // withCredentials: true, // This line is important for CORS with credentials
});

// Add a request interceptor to include the token in the headers
// api.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

export const getTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTask = async (id: string) => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
};

export const createTask = async (taskData: any) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const createOffer = async (taskId: string, offerData: any) => {
  try {
    const response = await api.post(`/tasks/${taskId}/offers`, offerData);
    return response.data;
  } catch (error) {
    console.error('Error creating offer:', error);
    throw error;
  }
};

export const createQuestion = async (taskId: string, questionData: any) => {
  try {
    const response = await api.post(`/tasks/${taskId}/questions`, questionData);
    return response.data;
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
};

export const createReply = async (taskId: string, questionId: string, replyData: any) => {
  try {
    const response = await api.post(`/tasks/${taskId}/questions/${questionId}/replies`, replyData);
    return response.data;
  } catch (error) {
    console.error('Error creating reply:', error);
    throw error;
  }
};

export const searchTasks = async (query: string) => {
  try {
    const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching tasks:', error);
    throw error;
  }
};

export default api;