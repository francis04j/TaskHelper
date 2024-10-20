import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { searchTasks } from '../api';

const HomePage: React.FC = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleOnSearch = async (string: string, results: any) => {
    if (string) {
      try {
        const tasks = await searchTasks(string);
        setSearchResults(tasks);
      } catch (error) {
        console.error('Error searching tasks:', error);
      }
    }
  };

  const handleOnSelect = (item: any) => {
    console.log(item);
  };

  const formatResult = (item: any) => {
    return (
      <span className="block text-left">{item.title}</span>
    );
  };

  return (
    <div>
      <div className="bg-cover bg-center h-[600px] flex items-center" style={{ backgroundImage: `url(https://source.unsplash.com/random/1600x900/?home-repair)` }}>
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Find the perfect tasker for your job</h1>
          <p className="text-xl mb-8">Get help with everyday tasks, from home repairs to virtual assistance</p>
          
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <ReactSearchAutocomplete
                items={searchResults}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                autoFocus
                formatResult={formatResult}
                fuseOptions={{ keys: ['title', 'description', 'location'] }}
                resultStringKeyName="title"
                styling={{
                  zIndex: 3,
                  borderRadius: "24px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "white",
                  height: "48px",
                  border: "1px solid #dfe1e5",
                  hoverBackgroundColor: "#f1f3f4",
                  color: "#2b2b2b",
                  fontSize: "16px",
                  fontFamily: "Open Sans, sans-serif",
                  iconColor: "#ed0000",
                  lineColor: "#ed0000",
                  placeholderColor: "#6e6e6e",
                  clearIconMargin: "3px 14px 0 0",
                  searchIconMargin: "0 0 0 16px"
                }}
                placeholder="What do you need help with?"
              />
            </div>
          </div>
          
          <Link to="/create-task" className="btn-secondary text-lg">
            Post a Task
            <ArrowRight size={20} className="ml-2 inline" />
          </Link>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How TaskMaster Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Post a task</h3>
            <p>Describe what you need done, when and where.</p>
          </div>
          <div className="text-center">
            <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Review offers</h3>
            <p>Compare taskers by price, reviews, and skills.</p>
          </div>
          <div className="text-center">
            <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get it done</h3>
            <p>Choose a tasker and get your task completed.</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Cleaning', 'Handyman', 'Moving', 'Gardening', 'Painting', 'Plumbing', 'Electrical', 'Assembly'].map((category, index) => (
              <Link key={index} to={`/tasks?category=${category.toLowerCase()}`} className="bg-white rounded-lg p-4 text-center hover:shadow-md transition duration-300">
                <h3 className="text-lg font-semibold">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose TaskMaster?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p>Your payment is held securely until the task is completed.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Insurance Coverage</h3>
            <p>Tasks are covered by our insurance policy.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Verified Taskers</h3>
            <p>All taskers undergo a verification process.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;