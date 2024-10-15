import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Search, Sliders, CheckCircle, User, AlertCircle } from 'lucide-react';
import { getTasks } from '../api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import TaskModal from '../components/TaskModal';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState([
    {
      _id: '1',
      title: 'House Cleaning',
      location: 'Sydney CBD',
      dueDate: '2023-06-15',
      budget: 120,
      category: 'cleaning',
      description: 'Need a thorough house cleaning for a 3-bedroom apartment.',
      lat: -33.8688,
      lng: 151.2093,
      taskeeId: 'taskee123',
      status: 'OPEN'
    },
    {
      _id: '2',
      title: 'Furniture Assembly',
      location: 'Bondi Beach',
      dueDate: '2023-06-18',
      budget: 80,
      category: 'handyman',
      description: 'Assemble a new IKEA wardrobe and bed frame.',
      lat: -33.8915,
      lng: 151.2767,
      taskeeId: 'taskee123',
      status: 'ASSIGNED'
    },
    {
      _id: '3',
      title: 'Grocery Delivery',
      location: 'Parramatta',
      dueDate: '2023-06-14',
      budget: 40,
      category: 'delivery',
      description: 'Pick up and deliver groceries for an elderly couple.',
      lat: -33.8150,
      lng: 151.0011,
      taskeeId: 'taskee123',
      status: 'COMPLETED'
    },
    {
      _id: '4',
      title: 'Garden Maintenance',
      location: 'North Sydney',
      dueDate: '2023-06-20',
      budget: 150,
      category: 'gardening',
      description: 'Mow lawn, trim hedges, and general garden tidy-up.',
      lat: -33.8389,
      lng: 151.2070,
      taskeeId: 'taskee123',
      status: 'OPEN'
    },
    {
      _id: '5',
      title: 'Dog Walking',
      location: 'Manly',
      dueDate: '2023-06-16',
      budget: 30,
      category: 'pet-care',
      description: 'Walk two friendly Labradors for 1 hour in the afternoon.',
      lat: -33.7969,
      lng: 151.2824,
      taskeeId: 'taskee123',
      status: 'ASSIGNED'
    }
  ]);

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
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // Uncomment the following line when the API is ready
        // const fetchedTasks = await getTasks();
        // setTasks(fetchedTasks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    // Uncomment the following line when the API is ready
    // fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task: any) => {
    return (
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || task.category === selectedCategory) &&
      (selectedBudget === '' || task.budget <= parseInt(selectedBudget))
    );
  });

  const center: [number, number] = [-33.8688, 151.2093]; // Sydney coordinates

  if (loading) {
    return <div className="text-center">Loading tasks...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-secondary">Available Tasks</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
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
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Categories</option>
          <option value="cleaning">Cleaning</option>
          <option value="handyman">Handyman</option>
          <option value="delivery">Delivery</option>
          <option value="gardening">Gardening</option>
          <option value="pet-care">Pet Care</option>
        </select>
        <select
          value={selectedBudget}
          onChange={(e) => setSelectedBudget(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Any Budget</option>
          <option value="50">Up to $50</option>
          <option value="100">Up to $100</option>
          <option value="200">Up to $200</option>
          <option value="500">Up to $500</option>
        </select>
        <button className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-accent transition-colors">
          <Sliders size={20} className="mr-2" />
          More Filters
        </button>
      </div>

      {/* Main Content: Task List and Map */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Task List Section */}
        <div className="md:w-1/2">
          <div className="space-y-4">
            {filteredTasks.map((task: any) => (
              <div key={task._id} 
              onClick={() => setSelectedTask(task)}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-secondary">{task.title}</h2>
                  <div className="flex items-center">
                      {getStatusIcon(task.status)}
                      <span className="ml-1 text-sm font-medium text-gray-600">{getStatusText(task.status)}</span>
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="md:w-1/2 h-[600px]">
          <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredTasks.map((task: any) => (
              <Marker key={task._id} position={[task.lat, task.lng]}>
                <Popup>
                  <h3>{task.title}</h3>
                  <p>{task.location}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
      </div>

  );
};

export default TaskListPage;