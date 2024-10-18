import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TaskMaster</h3>
            <p className="text-sm">Connect with skilled taskers for your everyday needs.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-gray-300 transition-colors">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:text-gray-300 transition-colors">How It Works</Link></li>
              <li><Link to="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">For Businesses</h4>
            <ul className="space-y-2">
              <li><Link to="/register-business" className="hover:text-gray-300 transition-colors">Register Business</Link></li>
              <li><Link to="/why-register-business" className="hover:text-gray-300 transition-colors">Why Register?</Link></li>
              <li><Link to="/business-faq" className="hover:text-gray-300 transition-colors">Business FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm">Email: support@taskmaster.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white border-opacity-20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;