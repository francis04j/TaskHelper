import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

// Mock data for search suggestions
const items = [
  { id: 0, name: 'House Cleaning' },
  { id: 1, name: 'Gardening' },
  { id: 2, name: 'Furniture Assembly' },
  { id: 3, name: 'Moving Assistance' },
  { id: 4, name: 'Painting' },
  { id: 5, name: 'Plumbing' },
  { id: 6, name: 'Electrical Work' },
  { id: 7, name: 'Carpentry' },
];

const HomePage: React.FC = () => {
  const handleOnSearch = (string: string, results: any) => {
    console.log(string, results);
  };

  const handleOnHover = (result: any) => {
    console.log(result);
  };

  const handleOnSelect = (item: any) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const formatResult = (item: any) => {
    return (
      <span className="block text-left">{item.name}</span>
    );
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6 text-secondary">Welcome to TaskMaster</h1>
      <p className="text-xl mb-8 text-text-light">Find skilled taskers for your everyday needs</p>
      
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            styling={{
              zIndex: 3,
              borderRadius: "24px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
              height: "48px",
              border: "1px solid #dfe1e5",
              hoverBackgroundColor: "#f1f3f4",
              color: "#212121",
              fontSize: "16px",
              fontFamily: "Neue Plak, sans-serif",
              iconColor: "#14a800",
              lineColor: "#14a800",
              placeholderColor: "#5e6d55",
              clearIconMargin: "3px 14px 0 0",
              searchIconMargin: "0 0 0 16px"
            }}
            placeholder="What do you need help with?"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-secondary">Post a Task</h3>
          <p className="mb-4 text-text-light">Describe what you need done, when and where.</p>
          <Link to="/create-task" className="text-primary hover:text-accent flex items-center justify-center">
            Get Started <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-secondary">Choose a Tasker</h3>
          <p className="mb-4 text-text-light">Browse profiles, reviews, and offers. Then, pick the best tasker for your job.</p>
          <Link to="/tasks" className="text-primary hover:text-accent flex items-center justify-center">
            Find Taskers <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-secondary">Get It Done</h3>
          <p className="mb-4 text-text-light">Your tasker arrives and gets the job done. Pay securely through our platform.</p>
          <Link to="/how-it-works" className="text-primary hover:text-accent flex items-center justify-center">
            Learn More <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </div>
      
      <Link to="/tasks" className="btn-primary">
        Browse All Tasks
      </Link>
    </div>
  );
};

export default HomePage;