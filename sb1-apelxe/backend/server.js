import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
//  optionsSuccessStatus: 200,
 // credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});