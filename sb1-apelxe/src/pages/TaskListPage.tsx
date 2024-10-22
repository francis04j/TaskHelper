import React, { useState, useEffect } from 'react';
import { MapPin, Clock, DollarSign, Search, Sliders, CheckCircle, User, AlertCircle, MessageSquare } from 'lucide-react';
import { getTasks } from '../api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import TaskDetails from '../components/TaskDetails';
import { Task } from '../types/Task';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || task.category === selectedCategory)
  );

  // Default coordinates for London
  const defaultCenter: [number, number] = [51.509865, -0.128005];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OPEN':
        return <AlertCircle size={18} className="text-green-500" />;
      case 'ASSIGNED':
        return <User size={18} className="text-blue-500" />;
      case 'COMPLETED':
        return <CheckCircle size={18} className="text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'Open';
      case 'ASSIGNED':
        return 'Assigned';
      case 'COMPLETED':
        return 'Completed';
      default:
        return '';
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-secondary">Available Tasks</h1>
      
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <div className="flex items-center">
          <Sliders className="mr-2 text-primary" size={20} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Categories</option>
            <option value="cleaning">Cleaning</option>
            <option value="handyman">Handyman</option>
            <option value="gardening">Gardening</option>
            <option value="pet-care">Pet Care</option>
            <option value="web-design">Web Design</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-secondary">{task.title}</h2>
                    <div className="flex items-center">
                      {getStatusIcon(task.status)}
                      <span className="ml-1 text-sm font-medium text-gray-600">{getStatusText(task.status)}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-text-light mb-2">
                    <MapPin size={18} className="mr-2 text-primary" />
                    <span>{task.location}</span>
                  </div>
                  <div className="flex items-center text-text-light mb-2">
                    <Clock size={18} className="mr-2 text-primary" />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-text-light">
                    <DollarSign size={18} className="mr-2 text-primary" />
                    <span>Budget: ${task.budget}</span>
                  </div>
                  <div className="flex items-center text-text-light mt-2">
                    <MessageSquare size={18} className="mr-2 text-primary" />
                    <span>{task.offers.length} offers</span>
                    <span className="mx-2">•</span>
                    <span>{task.questions.length} questions</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 h-[600px]">
          {selectedTask ? (
            <TaskDetails task={selectedTask} onClose={() => setSelectedTask(null)} />
          ) : (
            <MapContainer center={defaultCenter} zoom={11} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredTasks.map((task) => (
                <Marker key={task.id} position={[51.509865, -0.128005]}>
                  <Popup>
                    <h3>{task.title}</h3>
                    <p>{task.location}</p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;