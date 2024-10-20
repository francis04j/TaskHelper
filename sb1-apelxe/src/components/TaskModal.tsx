import React, { useState } from 'react';
import { X, MapPin, Clock, DollarSign, User, AlertCircle, CheckCircle, MessageSquare, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';

interface TaskMasterUser {
  id: string;
  name: string;
  // Add other user properties as needed
}

interface Reply {
  id: string;
  text: string;
  createdAt: Date;
  createdBy: TaskMasterUser;
  isAccepted?: boolean;
}

interface Question {
  id: string;
  text: string;
  createdAt: Date;
  askedBy: TaskMasterUser;
  replies: Reply[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  dueDate: string;
  budget: number;
  status: 'OPEN' | 'ASSIGNED' | 'COMPLETED';
  category: string;
  poster: TaskMasterUser;
  offers: any[];
  questions: Question[];
}

interface TaskModalProps {
  task: Task;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'offers' | 'questions'>('details');
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerDescription, setOfferDescription] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [replyText, setReplyText] = useState('');
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleMakeOffer = () => {
    if (isAuthenticated) {
      setShowOfferForm(true);
    } else {
      navigate('/signup', { state: { referrer: location.pathname } });
    }
  };

  const handleSubmitOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newOffer = await api.post(`/tasks/${task.id}/offers`, {
        amount: parseFloat(offerAmount),
        description: offerDescription,
        userId: user?.id,
      });
      console.log('Offer submitted:', newOffer);
      // Update the task with the new offer
      task.offers.push(newOffer);
      setOfferAmount('');
      setOfferDescription('');
      setShowOfferForm(false);
    } catch (error) {
      console.error('Error submitting offer:', error);
    }
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newQuestion = await api.post(`/tasks/${task.id}/questions`, {
        text: questionText,
        userId: user?.id,
      });
      console.log('Question submitted:', newQuestion);
      // Update the task with the new question
      task.questions.push(newQuestion);
      setQuestionText('');
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent, questionId: string) => {
    e.preventDefault();
     try {
      const newReply = await api.post(`/tasks/${task.id}/questions/${questionId}/replies`, {
        text: replyText,
        userId: user?.id,
      });
      console.log('Reply submitted:', newReply);
      // Update the task with the new reply
      const updatedQuestions = task.questions.map((q: any) =>
        q.id === questionId ? { ...q, replies: [...q.replies, newReply] } : q
      );
      task.questions = updatedQuestions;
      setReplyText('');
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>

        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-full ${activeTab === 'details' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button
            className={`px-4 py-2 rounded-full ${activeTab === 'offers' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('offers')}
          >
            Offers ({task.offers.length})
          </button>
          <button
            className={`px-4 py-2 rounded-full ${activeTab === 'questions' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('questions')}
          >
            Questions ({task.questions.length})
          </button>
        </div>

        {activeTab === 'details' && (
          <div>
            <div className="flex items-center mb-4">
              {getStatusIcon(task.status)}
              <span className="ml-2 font-medium">{getStatusText(task.status)}</span>
            </div>
            <p className="mb-4">{task.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <MapPin size={18} className="mr-2 text-primary" />
                <span>{task.location}</span>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-2 text-primary" />
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <DollarSign size={18} className="mr-2 text-primary" />
                <span>Budget: ${task.budget}</span>
              </div>
              <div className="flex items-center">
                <User size={18} className="mr-2 text-primary" />
                <span>Posted by: {task.poster?.name}</span>
              </div>
            </div>
            {user && user.id !== task.poster?.id && (
              <button onClick={handleMakeOffer} className="btn-primary">
                Make an Offer
              </button>
            )}
          </div>
        )}

        {activeTab === 'offers' && (
          <div>
            {showOfferForm ? (
              <form onSubmit={handleSubmitOffer} className="space-y-4">
                <div>
                  <label htmlFor="offerAmount" className="block text-sm font-medium text-gray-700">
                    Offer Amount ($)
                  </label>
                  <input
                    type="number"
                    id="offerAmount"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="offerDescription" className="block text-sm font-medium text-gray-700">
                    Offer Description
                  </label>
                  <textarea
                    id="offerDescription"
                    value={offerDescription}
                    onChange={(e) => setOfferDescription(e.target.value)}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary">
                  Submit Offer
                </button>
              </form>
            ) : (
              <div>
                <h3 className="text-xl font-semibold mb-4">Offers</h3>
                {task.offers.length > 0 ? (
                  task.offers.map((offer: any) => (
                    <div key={offer.id} className="bg-gray-100 rounded-lg p-4 mb-4">
                      <p className="font-semibold">${offer.amount}</p>
                      <p>{offer.description}</p>
                    </div>
                  ))
                ) : (
                  <p>No offers yet.</p>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'questions' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Questions</h3>
            {task.questions && task.questions.map((question: Question) => (
              <div key={question.id} className="bg-gray-100 rounded-lg p-4 mb-4">
                <p className="font-semibold">{question.text}</p>
                {question.replies && question.replies.map((reply: Reply) => (
                  <div key={reply.id} className="ml-4 mt-2 p-2 bg-white rounded">
                    <p>{reply.text}</p>
                  </div>
                ))}
                <form onSubmit={(e) => handleSubmitReply(e, question.id)} className="mt-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  />
                  <button type="submit" className="mt-2 btn-secondary">
                    Reply
                  </button>
                </form>
              </div>
            ))}
            <form onSubmit={handleSubmitQuestion} className="mt-4">
              <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Ask a question..."
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
              />
              <button type="submit" className="mt-2 btn-primary">
                Ask Question
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskModal;