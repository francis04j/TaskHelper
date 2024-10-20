import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const RegisterBusinessPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    country: '',
  });

  const businessTypes = [
    { id: 'cleaning', name: 'Cleaning' },
    { id: 'handyman', name: 'Handyman' },
    { id: 'gardening', name: 'Gardening' },
    { id: 'moving', name: 'Moving' },
    { id: 'petCare', name: 'Pet Care' },
    { id: 'tutoring', name: 'Tutoring' },
    { id: 'photography', name: 'Photography' },
    { id: 'webDesign', name: 'Web Design' },
    { id: 'personalTraining', name: 'Personal Training' },
    { id: 'carWash', name: 'Car Wash' },
    { id: 'other', name: 'Other' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBusinessTypeSelect = (item: any) => {
    setFormData(prevData => ({
      ...prevData,
      businessType: item.name,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setStep(3);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Tell us about your business</h2>
            <div className="mb-4">
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                Business Type
              </label>
              <ReactSearchAutocomplete
                items={businessTypes}
                onSelect={handleBusinessTypeSelect}
                onSearch={() => {}}
                onFocus={() => {}}
                autoFocus
                formatResult={(item) => (
                  <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
                )}
                styling={{
                  zIndex: 3,
                  borderRadius: "4px",
                  boxShadow: "none",
                  backgroundColor: "white",
                  border: "1px solid #d1d5db",
                  hoverBackgroundColor: "#f3f4f6",
                  color: "#111827",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  iconColor: "#6b7280",
                  lineColor: "#d1d5db",
                  placeholderColor: "#6b7280",
                  clearIconMargin: "3px 8px 0 0",
                  searchIconMargin: "0 0 0 8px"
                }}
                placeholder="Select or type a business type"
              />
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn-primary flex items-center justify-center w-full"
            >
              Next
              <ArrowRight size={18} className="ml-2" />
            </button>
          </>
        );
      case 2:
        return (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Your Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
                  Postcode
                </label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">
              Register Business
            </button>
          </form>
        );
      case 3:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Thank You for Registering!</h2>
            <p className="mb-4">We've received your business registration. Our team will review your information and get back to you shortly.</p>
            <Link to="/" className="btn-primary inline-block">
              Return to Home
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-secondary">Register Your Business</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {renderStep()}
      </div>
    </div>
  );
};

export default RegisterBusinessPage;