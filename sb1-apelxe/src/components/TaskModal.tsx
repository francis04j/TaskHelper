import React, { useState } from 'react';
import { X, MapPin, Clock, DollarSign, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface TaskModalProps {
  task: any;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerDescription, setOfferDescription] = useState('');
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

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

  const handleMakeOffer = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the offer to your backend API
    console.log('Offer submitted:', { taskId: task.id, amount: offerAmount, description: offerDescription });
    // Reset form and close it
    setOfferAmount('');
    setOfferDescription('');
    setShowOfferForm(false);
    onClose();
  };

  const handleMakeOfferClick = () => {
    if (isAuthenticated) {
      setShowOfferForm(true);
    } else {
      navigate('/signup');
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
        {!showOfferForm ? (
          <button 
            className="btn-primary w-full"
            onClick={handleMakeOfferClick}
          >
            Make an Offer
          </button>
        ) : (
          <form onSubmit={handleMakeOffer} className="space-y-4">
            <div>
              <label htmlFor="offerAmount" className="block text-sm font-medium text-gray-700">Your offer</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="offerAmount"
                  id="offerAmount"
                  className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="offerDescription" className="block text-sm font-medium text-gray-700">
                Describe your offer
              </label>
              <div className="mt-1">
                <textarea
                  id="offerDescription"
                  name="offerDescription"
                  rows={3}
                  className="shadow-sm focus:ring-primary focus:border-primary mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Tell the task poster why you're the best person for this job"
                  value={offerDescription}
                  onChange={(e) => setOfferDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => setShowOfferForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Submit Offer
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TaskModal;