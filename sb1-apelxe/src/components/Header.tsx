import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut, Search, ShoppingCart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold">
            TaskMaster
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/tasks" className="hover:text-gray-200 transition-colors">Find Work</Link>
            <Link to="/create-task" className="hover:text-gray-200 transition-colors">Post a Job</Link>
            <Link to="/why-register-business" className="hover:text-gray-200 transition-colors">Register Business</Link>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <button className="hover:text-gray-200 transition-colors">
              <Search size={20} />
            </button>
            <button className="hover:text-gray-200 transition-colors">
              <ShoppingCart size={20} />
            </button>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="hover:text-gray-200 transition-colors">
                  <User size={20} />
                </Link>
                <button
                  onClick={logout}
                  className="hover:text-gray-200 transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-200 transition-colors">Log in</Link>
                <Link to="/signup" className="hover:text-gray-200 transition-colors">Sign up</Link>
              </>
            )}
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-primary py-4">
          <nav className="flex flex-col items-center space-y-4">
            <Link to="/tasks" className="text-white hover:text-gray-200 transition-colors">Find Work</Link>
            <Link to="/create-task" className="text-white hover:text-gray-200 transition-colors">Post a Job</Link>
            <Link to="/why-register-business" className="text-white hover:text-gray-200 transition-colors">Register Business</Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-white hover:text-gray-200 transition-colors">Profile</Link>
                <button
                  onClick={logout}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-gray-200 transition-colors">Log in</Link>
                <Link to="/signup" className="text-white hover:text-gray-200 transition-colors">Sign up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;