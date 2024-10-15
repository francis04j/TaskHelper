import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Clock, DollarSign, User } from 'lucide-react';

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock task data (in a real app, you'd fetch this from an API)
  const task = {
    id: parseInt(id || '0'),
    title: 'House Cleaning',
    description: 'Need a thorough house cleaning for a 3-bedroom apartment. Tasks include dusting, vacuuming, mopping, and bathroom cleaning.',
    location: 'New York, NY',
    dueDate: '2023-04-15',
    budget: 100,
    poster: {
      name: 'John Doe',
      rating: 4.8,
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold mb-4 text-secondary">{task.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="flex items-center text-text-light">
          <MapPin size={18} className="mr-2 text-primary" />
          <span>{task.location}</span>
        </div>
        <div className="flex items-center text-text-light">
          <Clock size={18} className="mr-2 text-primary" />
          <span>Due: {task.dueDate}</span>
        </div>
        <div className="flex items-center text-text-light">
          <DollarSign size={18} className="mr-2 text-primary" />
          <span>Budget: ${task.budget}</span>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-secondary">Description</h2>
        <p className="text-text-light">{task.description}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-secondary">Posted by</h2>
        <div className="flex items-center">
          <User size={24} className="mr-2 text-primary" />
          <span className="font-medium mr-2 text-text">{task.poster.name}</span>
          <span className="text-accent">★ {task.poster.rating}</span>
        </div>
      </div>
      <button className="btn-primary">
        Make an Offer
      </button>
    </div>
  );
};

export default TaskDetailPage;