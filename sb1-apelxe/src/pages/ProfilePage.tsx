import React from 'react';
import { Star, MapPin, Calendar } from 'lucide-react';

const ProfilePage: React.FC = () => {
  // Mock user data (in a real app, you'd fetch this from an API)
  const user = {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    location: 'New York, NY',
    joinDate: 'January 2022',
    rating: 4.8,
    tasksCompleted: 37,
    bio: 'Experienced handywoman with a passion for home improvement and organization. Always ready to tackle new challenges and help others with their tasks.',
    skills: ['Home Repair', 'Furniture Assembly', 'Painting', 'Gardening', 'Moving Assistance'],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <img
            src="https://source.unsplash.com/random/100x100?face"
            alt={user.name}
            className="w-24 h-24 rounded-full mr-4"
          />
          <div>
            <h1 className="text-3xl font-bold text-secondary">{user.name}</h1>
            <p className="text-text-light">{user.email}</p>
            <div className="flex items-center mt-2">
              <Star className="text-accent mr-1" size={18} />
              <span className="font-medium mr-2 text-text">{user.rating}</span>
              <span className="text-text-light">({user.tasksCompleted} tasks completed)</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-text-light">
            <MapPin size={18} className="mr-2 text-primary" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center text-text-light">
            <Calendar size={18} className="mr-2 text-primary" />
            <span>Member since {user.joinDate}</span>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-secondary">About Me</h2>
          <p className="text-text-light">{user.bio}</p>
        </div>
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
      </div>
    </div>
  );
};

export default ProfilePage;