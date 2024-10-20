import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';

const SignupPage: React.FC = () => {
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

    if (!agreeTerms) {
      setError('You must agree to the Terms and Conditions to sign up.');
      return;
    }

    const userType = mainGoal === 'post' ? 'tasker' : 'taskee';

    try {
      const response = await api.post('/auth/register', { 
        name, 
        email, 
        password, 
        userType,
        location,
        mainGoal,
        agreeMarketing
      });

      const { token, user } = response.data;
      login(token, user);

      // Get the referrer from the location state
      const referrer = locationHook.state?.referrer;
      if (referrer) {
        navigate(referrer);
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Main Goal</label>
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
        <div>
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
        <div>
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
        <button type="submit" className="btn-primary w-full">Sign Up</button>
      </form>
      <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
      </p>
    </div>
  );
};

export default SignupPage;