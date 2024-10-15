import React from 'react';
import { X, MapPin, Clock, DollarSign, User, AlertCircle, CheckCircle } from 'lucide-react';

interface TaskModalProps {
  task: any;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-secondary">{task.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center text-text-light">
            <MapPin size={18} className="mr-2 text-primary" />
            <span>{task.location}</span>
          </div>
          <div className="flex items-center text-text-light">
            <Clock size={18} className="mr-2 text-primary" />
            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-text-light">
            <DollarSign size={18} className="mr-2 text-primary" />
            <span>Budget: ${task.budget}</span>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center mb-2">
            {getStatusIcon(task.status)}
            <span className="ml-2 font-medium text-gray-700">{getStatusText(task.status)}</span>
          </div>
          <p className="text-text-light">{task.description}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-secondary">Task Details</h3>
          <ul className="list-disc list-inside text-text-light">
            <li>Category: {task.category}</li>
            {/* Add more task details here */}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-secondary">Posted by</h3>
          <div className="flex items-center">
            <User size={24} className="mr-2 text-primary" />
            <span className="font-medium mr-2 text-text">John Doe</span>
            <span className="text-accent">★ 4.8</span>
          </div>
        </div>
        <button className="btn-primary w-full">
          Make an Offer
        </button>
      </div>
    </div>
  );
};

export default TaskModal;