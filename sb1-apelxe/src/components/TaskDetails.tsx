import React, { useState } from 'react';
import { X, MapPin, Clock, DollarSign, User, AlertCircle, CheckCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import ProfileCompletionModal from './ProfileCompletionModal';
import { Offer } from '../types/Offer';

interface TaskDetailsProps {
  task: any;
  onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onClose }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'offers' | 'questions'>('details');
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerDescription, setOfferDescription] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [showProfileCompletionModal, setShowProfileCompletionModal] = useState(false);
  const { user, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleMakeOffer = () => {
    if (!isAuthenticated) {
      navigate('/signup', { state: { referrer: location.pathname } });
      return;
    }

    if (user && (!user.profilePicture || !user.dateOfBirth || !user.mobileNumber || !user.bankAccount || !user.billingAddress)) {
      setShowProfileCompletionModal(true);
    } else {
      setActiveTab('offers');
      setShowOfferForm(true);
    }
  };

  const handleSubmitOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const newOffer = await api.post(`/tasks/${task.id}/offers`, {
        amount: parseFloat(offerAmount),
        description: offerDescription,
        userId: user.id,
      });
      console.log('Offer submitted:', newOffer);
      // Update the task with the new offer
      task.offers.push(newOffer.data);
      setOfferAmount('');
      setOfferDescription('');
      setShowOfferForm(false);
    } catch (error) {
      console.error('Error submitting offer:', error);
    }
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const newQuestion = await api.post(`/tasks/${task.id}/questions`, {
        text: questionText,
        userId: user.id,
      });
      console.log('Question submitted:', newQuestion);
      // Update the task with the new question
      task.questions.push(newQuestion.data);
      setQuestionText('');
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent, questionId: string) => {
    e.preventDefault();
    if (!user) return;

    try {
      const newReply = await api.post(`/tasks/${task.id}/questions/${questionId}/replies`, {
        text: replyText,
        userId: user.id,
      });
      console.log('Reply submitted:', newReply);
      // Update the task with the new reply
      const updatedQuestions = task.questions.map((q: any) =>
        q.id === questionId ? { ...q, replies: [...(q.replies || []), newReply.data] } : q
      );
      task.questions = updatedQuestions;
      setReplyText('');
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  const handleProfileCompletion = async (updatedUserData: any) => {
    try {
      // Update the user in the in-memory database
      const response = await api.patch(`/users/${user?.id}`, updatedUserData);
      const updatedUser = response.data;

      // Update the user context
      updateUser(updatedUser);

      console.log('User profile updated:', updatedUser);
      setShowProfileCompletionModal(false);
      setActiveTab('offers');
      setShowOfferForm(true);
    } catch (error) {
      console.error('Error updating user profile:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleAcceptOffer = async (offerId: string) => {
    try {
      await api.post(`/tasks/${task.id}/offers/${offerId}/accept`);
      // Update the local task state to reflect the accepted offer
      const updatedOffers = task.offers.map((offer: Offer) => ({
        ...offer,
        status: offer.id === offerId ? 'accepted' : 'rejected'
      }));
      task.offers = updatedOffers;
      task.status = 'ASSIGNED';
      // Force a re-render
      setActiveTab('offers');
    } catch (error) {
      console.error('Error accepting offer:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
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
            {task.poster && (
              <div className="flex items-center">
                <User size={18} className="mr-2 text-primary" />
                <span>Posted by: FIXtask.poster</span>
              </div>
            )}
          </div> 
          {user && user.id !== task.poster && (
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
                <div className="space-y-4">
                  {task.offers.map((offer: Offer) => (
                    <div key={offer.id} className="bg-gray-100 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={offer.user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(offer.user.name)}&background=random`}
                            alt={offer.user.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-lg">{offer.user.name}</h4>
                              <p className="text-sm text-gray-500">{formatDate(offer.createdAt)}</p>
                            </div>
                            <div className="text-xl font-bold text-primary">
                              ${offer.amount}
                            </div>
                          </div>
                          <p className="mt-2 text-gray-700">{offer.description}</p>
                          {user && user.id === task.poster && task.status === 'OPEN' && offer.status === 'pending' && (
                            <button
                              onClick={() => handleAcceptOffer(offer.id)}
                              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Accept Offer
                            </button>
                          )}
                          {offer.status === 'accepted' && (
                            <div className="mt-2 flex items-center text-green-600">
                              <CheckCircle size={16} className="mr-1" />
                              <span className="text-sm font-medium">Accepted</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
          {task.questions.map((question: any) => (
            <div key={question.id} className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="font-semibold">{question.text}</p>
              {question.replies && question.replies.map((reply: any) => (
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

      {showProfileCompletionModal && user && (
        <ProfileCompletionModal
          user={user}
          onComplete={handleProfileCompletion}
          onClose={() => setShowProfileCompletionModal(false)}
        />
      )}
    </div>
  );
};

export default TaskDetails;