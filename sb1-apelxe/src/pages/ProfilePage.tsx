import React from 'react';
import { Star, MapPin, Calendar, Briefcase, Mail, Phone, CreditCard, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-center py-8">Please log in to view your profile.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <img
            src={user.profilePicture || `https://source.unsplash.com/random/100x100?face&${user.id}`}
            alt={user.name}
            className="w-24 h-24 rounded-full mr-4"
          />
          <div>
            <h1 className="text-3xl font-bold text-secondary">{user.name}</h1>
            <p className="text-text-light">{user.email}</p>
            <div className="flex items-center mt-2">
              <Star className="text-accent mr-1" size={18} />
              <span className="font-medium mr-2 text-text">{user.rating || 'N/A'}</span>
              <span className="text-text-light">({user.tasksCompleted || 0} tasks completed)</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-text-light">
            <MapPin size={18} className="mr-2 text-primary" />
            <span>{user.location || 'Location not specified'}</span>
          </div>
          <div className="flex items-center text-text-light">
            <Calendar size={18} className="mr-2 text-primary" />
            <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-text-light">
            <Briefcase size={18} className="mr-2 text-primary" />
            <span>{user.userType === 'tasker' ? 'Task Poster' : 'Service Provider'}</span>
          </div>
          <div className="flex items-center text-text-light">
            <Mail size={18} className="mr-2 text-primary" />
            <span>{user.email}</span>
          </div>
          {user.phone && (
            <div className="flex items-center text-text-light">
              <Phone size={18} className="mr-2 text-primary" />
              <span>{user.phone}</span>
            </div>
          )}
          {user.dateOfBirth && (
            <div className="flex items-center text-text-light">
              <Calendar size={18} className="mr-2 text-primary" />
              <span>Born on {new Date(user.dateOfBirth).toLocaleDateString()}</span>
            </div>
          )}
          {user.mobileNumber && (
            <div className="flex items-center text-text-light">
              <Phone size={18} className="mr-2 text-primary" />
              <span>{user.mobileNumber}</span>
            </div>
          )}
          {user.bankAccount && (
            <div className="flex items-center text-text-light">
              <CreditCard size={18} className="mr-2 text-primary" />
              <span>Bank Account: ****{user.bankAccount.accountNumber.slice(-4)}</span>
            </div>
          )}
          {user.billingAddress && (
            <div className="flex items-center text-text-light">
              <Home size={18} className="mr-2 text-primary" />
              <span>Billing Address: {user.billingAddress}</span>
            </div>
          )}
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-secondary">About Me</h2>
          <p className="text-text-light">{user.bio || 'No bio provided yet.'}</p>
        </div>
        {user.skills && user.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-secondary">Skills</h2>
            <div className="flex flex-wrap">
              {user.skills.map((skill, index) => (
                <span key={index} className="bg-background text-primary px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;