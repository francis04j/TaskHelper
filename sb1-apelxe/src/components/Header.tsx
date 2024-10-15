import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, List, PlusCircle, User, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const { user, logout, isAuthenticated } = useAuth();

  const openAuthModal = (mode: 'signup' | 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center">
          <Home className="mr-2" />
          TaskMaster
        </Link>
        <nav className="flex items-center">
          <ul className="flex space-x-6 mr-6">
            <li>
              <Link to="/tasks" className="flex items-center text-text-light hover:text-primary">
                <List className="mr-1" size={18} />
                Find Work
              </Link>
            </li>
            <li>
              <Link to="/create-task" className="flex items-center text-text-light hover:text-primary">
                <PlusCircle className="mr-1" size={18} />
                Post a Job
              </Link>
            </li>
          </ul>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="flex items-center text-text-light hover:text-primary">
                <User className="mr-1" size={18} />
                {user?.name}
              </Link>
              <button
                onClick={logout}
                className="flex items-center text-text-light hover:text-primary"
              >
                <LogOut className="mr-1" size={18} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-2 text-primary border border-primary rounded hover:bg-primary hover:text-white transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-accent transition-colors"
              >
                Sign up
              </button>
            </div>
          )}
        </nav>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} mode={authMode} />
    </header>
  );
};

export default Header;