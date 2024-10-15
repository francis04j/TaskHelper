import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signup' | 'login';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState<'tasker' | 'taskee'>('taskee');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let response;
      if (mode === 'signup') {
        response = await api.post('/auth/register', { name, email, password, userType });
      } else {
        response = await api.post('/auth/login', { email, password });
      }

      const { token, user } = response.data;
      login(token, user);
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
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Type
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="tasker"
                      checked={userType === 'tasker'}
                      onChange={() => setUserType('tasker')}
                      className="form-radio text-primary"
                    />
                    <span className="ml-2">Tasker</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="taskee"
                      checked={userType === 'taskee'}
                      onChange={() => setUserType('taskee')}
                      className="form-radio text-primary"
                    />
                    <span className="ml-2">Taskee</span>
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