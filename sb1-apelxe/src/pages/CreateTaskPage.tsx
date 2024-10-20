import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Globe } from 'lucide-react';
import { createTask } from '../api';
import { useNavigate } from 'react-router-dom';

const CreateTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [dueDate, setDueDate] = useState('');
  const [budget, setBudget] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [dateOption, setDateOption] = useState('');  
  const [isLoading, setIsLoading] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);

  // Default coordinates for London
  const DEFAULT_LAT = 51.509865;
  const DEFAULT_LNG = -0.128005;

  useEffect(() => {
    // Load Google Places API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=env.GOOGLE_API_KEY&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const steps = [
    { number: 1, name: 'Describe' },
    { number: 2, name: 'Location' },
    { number: 3, name: 'Date' },
    { number: 4, name: 'Budget' },
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const newTask = await createTask({ 
        title, 
        description, 
        isOnline, 
        location: isOnline ? null : location, 
        dueDate, 
        budget: parseFloat(budget),
        lat: isOnline ? DEFAULT_LAT : DEFAULT_LAT,
        lng: isOnline ? DEFAULT_LAT : DEFAULT_LNG,
      });
      console.log('Task created:', newTask);
      navigate('/tasks');
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateOptionChange = (option: string) => {
    setDateOption(option);
    let date = new Date();
    switch (option) {
      case 'today':
        setDueDate(date.toISOString().split('T')[0]);
        break;
      case 'tomorrow':
        date.setDate(date.getDate() + 1);
        setDueDate(date.toISOString().split('T')[0]);
        break;
      case 'within3days':
        date.setDate(date.getDate() + 3);
        setDueDate(date.toISOString().split('T')[0]);
        break;
      case 'within1week':
        date.setDate(date.getDate() + 7);
        setDueDate(date.toISOString().split('T')[0]);
        break;
      case 'custom':
        setDueDate('');
        break;
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
  
    if (value.length > 2 && window.google && window.google.maps && window.google.maps.places) {
      const autocompleteService = new window.google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions(
        { input: value },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            setLocationSuggestions(predictions.map(p => p.description));
          }
        }
      );
    } else {
      setLocationSuggestions([]);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-secondary">What do you need done?</h2>
            <div className="mb-4">
              <label htmlFor="title" className="block text-text font-medium mb-2">Task title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
                placeholder="E.g. Help move my sofa"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-text font-medium mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
                required
                placeholder="Be as specific as you can about what needs doing"
              ></textarea>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Where do you need it done?</h2>
            <div className="mb-4">
              <label className="block text-text font-medium mb-2">Task Type</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIsOnline(true)}
                  className={`flex items-center px-4 py-2 rounded-full ${
                    isOnline === true ? 'bg-primary text-white' : 'bg-gray-200 text-text-light'
                  }`}
                >
                  <Globe className="mr-2" size={18} />
                  Online
                </button>
                <button
                  type="button"
                  onClick={() => setIsOnline(false)}
                  className={`flex items-center px-4 py-2 rounded-full ${
                    isOnline === false ? 'bg-primary text-white' : 'bg-gray-200 text-text-light'
                  }`}
                >
                  <MapPin className="mr-2" size={18} />
                  In-person
                </button>
              </div>
            </div>
            {isOnline === false && (
              <div className="mb-4">
                <label htmlFor="location" className="block text-text font-medium mb-2">Location</label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={handleLocationChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  placeholder="Enter a suburb"
                />
                {locationSuggestions.length > 0 && (
                  <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow-sm">
                    {locationSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setLocation(suggestion);
                          setLocationSuggestions([]);
                        }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-secondary">When do you need it done?</h2>
            <div className="mb-4">
              <label htmlFor="dueDate" className="block text-text font-medium mb-2">Due date</label>
              <div className="flex flex-wrap gap-2">
                {['Today', 'Tomorrow', 'Within 3 days', 'Within 1 week', 'Custom'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleDateOptionChange(option.toLowerCase().replace(/\s/g, ''))}
                    className={`px-4 py-2 rounded-full ${
                      dateOption === option.toLowerCase().replace(/\s/g, '')
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-text-light'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {dateOption === 'custom' && (
                <div className="mt-2">
                  <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              )}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-secondary">What's your budget?</h2>
            <div className="mb-6">
              <label htmlFor="budget" className="block text-text font-medium mb-2">Budget ($)</label>
              <input
                type="number"
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                min="0"
                step="0.01"
                required
                placeholder="Enter your budget"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-secondary">Post a New Task</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between mb-8">
          {steps.map((s) => (
            <div key={s.number} className="flex flex-col items-center w-1/4">
              <div
                className={`w-full h-2 rounded-full ${
                  s.number <= step ? 'bg-primary' : 'bg-gray-300'
                } mb-2`}
              ></div>
              <span className={`text-sm ${s.number === step ? 'font-semibold text-primary' : 'text-text-light'}`}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          {renderStep()}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="btn-secondary flex items-center"
                disabled={isSubmitting}
              >
                <ArrowLeft size={18} className="mr-2" />
                Previous
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary flex items-center ml-auto"
                disabled={isSubmitting}
              >
                Next
                <ArrowRight size={18} className="ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="btn-primary flex items-center ml-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Posting...' : 'Post Task'}
                {!isSubmitting && <ArrowRight size={18} className="ml-2" />}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;