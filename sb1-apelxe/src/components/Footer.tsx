import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">TaskMaster</h3>
            <p className="text-sm">Connect with skilled taskers for your everyday needs.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm">
              <li><a href="/about" className="hover:text-accent">About Us</a></li>
              <li><a href="/how-it-works" className="hover:text-accent">How It Works</a></li>
              <li><a href="/terms" className="hover:text-accent">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-accent">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-sm">Email: support@taskmaster.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;