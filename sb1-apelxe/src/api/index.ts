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

export const searchTasks = async (query: string) => {
  const response = await api.get(`/search?q=${query}`);
  return response.data;
};

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const getTask = async (id: string) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (taskData: any) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error('Error in createTask:', error);
      throw error;
    }
  };

export const updateTask = async (id: string, taskData: any) => {
  const response = await api.patch(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id: string, userData: any) => {
  const response = await api.patch(`/users/${id}`, userData);
  return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  };
  
  export const register = async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  };
  
export default api;