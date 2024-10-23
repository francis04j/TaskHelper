import React, { useState, useEffect, MouseEventHandler } from 'react';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Globe, Upload, X } from 'lucide-react';
import { createTask, uploadImage } from '../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth hook

const CreateTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the authenticated user
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskImages, setTaskImages] = useState<(File | null)[]>([null, null, null, null, null]);
  const [location, setLocation] = useState('');
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [dueDate, setDueDate] = useState('');
  const [budget, setBudget] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [dateOption, setDateOption] = useState('');  
  const [isLoading, setIsLoading] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  // Default coordinates for London
  const DEFAULT_LAT = 51.509865;
  const DEFAULT_LNG = -0.128005;

  const totalSteps = 5;

  // Store task data in localStorage when navigating to signup
  const saveTaskDataToStorage = (uploadedUrls: string[]) => {
    const taskData = {
      title,
      description,
      images: uploadedUrls,
      location: location,
      isOnline,
      dueDate,
      budget,
      dateOption,
      step
    };
    console.log('saving pendingTask Data', taskData);
    localStorage.setItem('pendingTaskData', JSON.stringify(taskData));
  };

  useEffect(() => {
    // Load Google Places API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Load task data from localStorage when returning from signup
  useEffect(() => {
    const pendingTaskData = localStorage.getItem('pendingTaskData');
    if (pendingTaskData && user) {
      const data = JSON.parse(pendingTaskData);
      setTitle(data.title);
      setDescription(data.description);
      setLocation(data.location);
      setIsOnline(data.isOnline);
      setDueDate(data.dueDate);
      setBudget(data.budget);
      setDateOption(data.dateOption);
      setStep(data.step);
      setUploadedImageUrls(data.uploadedUrls);
      console.log('pendingTaskData', pendingTaskData)
      // Clear the stored data
      localStorage.removeItem('pendingTaskData');
      
      // If we have all required data, submit the task
      if (data.title && data.dueDate && data.budget && (data.isOnline === false ? data.location : true)) {
        handleSubmit(new Event('submit') as any, true);
      }
    }
  }, [user]);
  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const newTaskImages = [...taskImages];
      newTaskImages[index] = file;
      setTaskImages(newTaskImages);
    }
  };

  const removeImage = (index: number) => {
    const newTaskImages = [...taskImages];
    newTaskImages[index] = null;
    setTaskImages(newTaskImages);
  };

  const renderImageUploader = () => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Images (Max 5)
      </label>
      <div className="grid grid-cols-5 gap-4">
        {taskImages.map((file, index) => (
          <div key={index} className="relative">
            {file ? (
              <div className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Task image ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, index)}
                  className="hidden"
                />
                <Upload size={24} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Upload</span>
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent, isAutoSubmit = false) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate required fields
  if (!title) {
    setError('Missing required fields title');
  }

  if (isOnline == false && !location) {
    setError('Missing required field: Location');
  }

  if (!dueDate ) {
    setError('Missing required field: DueDate');
  }

  if (!budget) {
    setError('Missing required field: Budget');
  }

  if (isOnline === null) {
    setError('Missing required field: isOnline');
  }


    try {
      // Upload images to mock S3
      const uploadPromises = taskImages
        .filter((image): image is File => image !== null)
        .map(uploadImage);
      const uploadedUrls = await Promise.all(uploadPromises);
      console.log('UPLOADED-URLS', uploadedUrls)
      setUploadedImageUrls(uploadedUrls);

      // If user is not authenticated, save data and redirect to signup
    if (!user) {
      saveTaskDataToStorage(uploadedUrls);
      navigate('/signup', { 
        state: { 
          referrer: '/create-task',
          message: 'Please sign up to create your task. Your task details have been saved.'
        }
      });
      return;
    }

    const pendingTaskData = localStorage.getItem('pendingTaskData');
    if (pendingTaskData && user) {
      const data = JSON.parse(pendingTaskData);
      setTitle(data.title);
      setDescription(data.description);
      setLocation(data.location);
      setIsOnline(data.isOnline);
      setDueDate(data.dueDate);
      setBudget(data.budget);
      setDateOption(data.dateOption);
      setStep(data.step);
      setUploadedImageUrls(data.images);

      const taskData = {
       ...data,
        location: data.isOnline ? 'ONLINE' : data.location,
        lat: isOnline ? null : DEFAULT_LAT,
        lng: isOnline ? null : DEFAULT_LNG,
       
        budget: parseFloat(data.budget),
        images: data.images,
        poster: user?.id,
      };

      // Clear the stored data
      localStorage.removeItem('pendingTaskData');

      console.log('Creating tasks:', taskData);
      const newTask = await createTask(taskData);
      console.log('Task created:', newTask);
      navigate('/tasks');
    }else if(user){
      const taskData = {
        title,
        description,
        isOnline,
        location: isOnline ? 'ONLINE' : location,
        lat: isOnline ? null : DEFAULT_LAT,
        lng: isOnline ? null : DEFAULT_LNG,
        dueDate,
        budget: parseFloat(budget),
        images: uploadedUrls,
        poster: user?.id,
      };

      console.log('Creating tasks:', taskData);
      const newTask = await createTask(taskData);
      console.log('Task created:', newTask);
      navigate('/tasks');
    }
      
     
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

    if (value.length > 2) {
      const autocompleteService = new google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions(
        { input: value },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            setLocationSuggestions(predictions.map(p => p.description));
          }
        }
      );
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleNext = () => {
    setError(''); // Clear any existing errors
    if (step === 2 && isOnline) {
      setStep(4); // Skip to step 4 if the task is online
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setError(''); // Clear any existing errors
    if (step === 4 && isOnline) {
      setStep(2); // Go back to step 2 if the task is online
    } else {
      setStep(step - 1);
    }
  };

  const handleOnlineSelection = (value: boolean) => {
    setIsOnline(value);

    setError(''); // Clear any existing errors
    if (value) {
      setLocation(''); // Clear location if task is online
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
            {renderImageUploader()}
          </>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Is this an online or in-person task?</h2>
            <div className="flex space-x-4">
              <button type="button"
                onClick={() => handleOnlineSelection(true)}
                className={`flex items-center px-4 py-2 rounded-full ${
                  isOnline === true ? 'bg-primary text-white' : 'bg-gray-200 text-text-light'
                }`}
              >
                <Globe className="mr-2" size={18} />
                Online
              </button>
              <button type="button"
                onClick={() => handleOnlineSelection(false)}
                className={`flex items-center px-4 py-2 rounded-full ${
                  isOnline === false ? 'bg-primary text-white' : 'bg-gray-200 text-text-light'
                }`}
              >
                <MapPin className="mr-2" size={18} />
                In-person
              </button>
            </div>
          </div>
        );
      case 3:
        return isOnline ? null : (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Where do you need this done?</h2>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Enter location"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              {locationSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
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
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-secondary">When do you need this done?</h2>
            <div className="flex flex-wrap gap-2 mb-4">
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
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            )}
          </div>
        );
      case 5:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-secondary">What's your budget?</h2>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter your budget"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              min="0"
              step="0.01"
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-secondary">Post a New Task</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNumber) => (
              <div
                key={stepNumber}
                className={`w-1/5 h-2 rounded-full ${
                  stepNumber <= step ? 'bg-primary' : 'bg-gray-200'
                }`}
              ></div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNumber) => (
              <span
                key={stepNumber}
                className={`text-sm ${
                  stepNumber <= step ? 'text-primary font-semibold' : 'text-gray-400'
                }`}
              >
                Step {stepNumber}
              </span>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {renderStep()}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center text-primary"
              >
                <ArrowLeft size={18} className="mr-1" />
                Back
              </button>
            )}
            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center text-primary ml-auto"
              >
                Next
                <ArrowRight size={18} className="ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Task...' : 'Post Task'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;