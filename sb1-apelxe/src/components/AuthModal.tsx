import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signup' | 'login';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [mainGoal, setMainGoal] = useState<'post' | 'earn'>('post');
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const locationHook = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup' && !agreeTerms) {
      setError('You must agree to the Terms and Conditions to sign up.');
      return;
    }

    try {
      let response;
      if (mode === 'signup') {
        const userType = mainGoal === 'post' ? 'tasker' : 'taskee';
        response = await api.post('/auth/register', { 
          name, 
          email, 
          password, 
          userType,
          location,
          mainGoal,
          agreeMarketing
        });
      } else {
        response = await api.post('/auth/login', { email, password });
      }

      const { token, user } = response.data;
      login(token, user);

      // Get the referrer from the location state
      const referrer = locationHook.state?.referrer;
      if (referrer) {
        navigate(referrer);
      } else {
        navigate('/');
      }
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const handleSocialAuth = (provider: string) => {
    // Placeholder for social media authentication
    console.log(`Authenticating with ${provider}`);
    // In a real implementation, you would redirect to the OAuth provider here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-secondary">
            {mode === 'signup' ? 'Sign Up' : 'Log In'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Goal
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="post"
                      checked={mainGoal === 'post'}
                      onChange={() => setMainGoal('post')}
                      className="form-radio text-primary"
                    />
                    <span className="ml-2">To post tasks</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="earn"
                      checked={mainGoal === 'earn'}
                      onChange={() => setMainGoal('earn')}
                      className="form-radio text-primary"
                    />
                    <span className="ml-2">To earn money</span>
                  </label>
                </div>
              </div>
            </>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          {mode === 'signup' && (
            <>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={agreeMarketing}
                    onChange={(e) => setAgreeMarketing(e.target.checked)}
                    className="form-checkbox text-primary"
                  />
                  <span className="ml-2 text-sm">I agree to receive product updates and marketing communications</span>
                </label>
              </div>
              <div className="mb-6">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="form-checkbox text-primary"
                    required
                  />
                  <span className="ml-2 text-sm">
                    I agree to the <Link to="/terms" className="text-primary hover:underline" target="_blank">Terms and Conditions</Link>
                  </span>
                </label>
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-accent transition-colors"
          >
            {mode === 'signup' ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 mb-2">Or continue with</p>
          <div className="flex justify-center space-x-4">
            <button onClick={() => handleSocialAuth('Google')} className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
              G
            </button>
            <button onClick={() => handleSocialAuth('Facebook')} className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              f
            </button>
            <button onClick={() => handleSocialAuth('Apple')} className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
              A
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;