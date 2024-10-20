import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const WhyRegisterBusinessPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-secondary">Why register your business with TaskMaster?</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-secondary">Grow your business</h2>
        <ul className="space-y-4">
          {[
            "Reach new customers in your area",
            "Increase your bookings",
            "Manage your calendar and availability",
            "Receive secure online payments",
            "Build your online reputation",
            "Get immediate notification for related task",
            "Your reply is priotised",
            "Dedicated page"
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-secondary">How it works</h2>
        <ol className="list-decimal list-inside space-y-4">
          <li>Register your business for free</li>
          <li>Set up your profile and services</li>
          <li>Receive booking requests from customers</li>
          <li>Accept bookings and get paid securely through our platform</li>
        </ol>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-secondary">What you get</h2>
        <ul className="space-y-4">
          {[
            "A personalized business profile",
            "Booking and availability management tools",
            "Secure payment processing",
            "Customer reviews and ratings",
            "Marketing and promotion opportunities",
            "Access to a large customer base"
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <Link to="/register-business" className="btn-primary inline-flex items-center">
          Register your business now
          <ArrowRight className="ml-2" size={18} />
        </Link>
      </div>
    </div>
  );
};

export default WhyRegisterBusinessPage;