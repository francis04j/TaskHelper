import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { searchTasks } from '../api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage: React.FC = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

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

  const HeroSection = ({ title, description, bgImage }: { title: string; description: string; bgImage: string }) => (
    <div className="bg-cover bg-center h-[600px] flex items-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl font-bold mb-6">{title}</h1>
        <p className="text-xl mb-8">{description}</p>
        
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
  );

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex),
  };

  const heroSections = [
    {
      title: "Find the perfect tasker for your job",
      description: "Get help with everyday tasks, from home repairs to virtual assistance",
      bgImage: "https://source.unsplash.com/random/1600x900/?home-repair"
    },
    {
      title: "Skilled professionals at your service",
      description: "Connect with experts in various fields to get your tasks done efficiently",
      bgImage: "https://source.unsplash.com/random/1600x900/?professional"
    },
    {
      title: "Your to-do list, our priority",
      description: "Let us handle your tasks while you focus on what matters most to you",
      bgImage: "https://source.unsplash.com/random/1600x900/?checklist"
    },
    {
      title: "Quality service, guaranteed",
      description: "Experience top-notch service from our vetted and reliable taskers",
      bgImage: "https://source.unsplash.com/random/1600x900/?quality-service"
    }
  ];

  return (
    <div>
      <div className="carousel-container relative">
        <Slider ref={sliderRef} {...sliderSettings}>
          {heroSections.map((section, index) => (
            <HeroSection key={index} {...section} />
          ))}
        </Slider>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4">
          <button
            className="carousel-arrow left-arrow"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <ChevronLeft size={24} />
          </button>
          <div className="carousel-progress-container">
            {heroSections.map((_, index) => (
              <div
                key={index}
                className={`carousel-progress-bar ${index === currentSlide ? 'active' : ''}`}
              >
                <div className="carousel-progress-fill"></div>
              </div>
            ))}
          </div>
          <button
            className="carousel-arrow right-arrow"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">How TaskMaster Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-accent text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Post a Task</h3>
              <p className="text-text-light">Describe what you need done, when and where.</p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Choose a Tasker</h3>
              <p className="text-text-light">Browse profiles, reviews, and offers. Then pick the best Tasker for your job.</p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Get It Done</h3>
              <p className="text-text-light">Your Tasker arrives and gets the job done. Pay securely through our platform.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Cleaning', 'Handyman', 'Delivery', 'Gardening', 'Moving', 'Pet Care', 'Personal Assistant', 'Tech Support'].map((category) => (
              <Link key={category} to={`/tasks?category=${category.toLowerCase()}`} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                <span className="text-text font-medium">{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;