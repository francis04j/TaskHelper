import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ProfileCompletionModalProps {
  user: any;
  onComplete: (updatedUser: any) => void;
  onClose: () => void;
}

const ProfileCompletionModal: React.FC<ProfileCompletionModalProps> = ({ user, onComplete, onClose }) => {
  const [step, setStep] = useState(1);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || '');
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth || '');
  const [mobileNumber, setMobileNumber] = useState(user.mobileNumber || '');
  const [bankAccount, setBankAccount] = useState(user.bankAccount || { sortCode: '', accountNumber: '' });
  const [billingAddress, setBillingAddress] = useState(user.billingAddress || '');

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      const updatedUser = {
        ...user,
        profilePicture,
        dateOfBirth,
        mobileNumber,
        bankAccount,
        billingAddress,
      };
      onComplete(updatedUser);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Profile Picture</h3>
            <input
              type="text"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              placeholder="Enter URL of your profile picture"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Date of Birth</h3>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Mobile Number</h3>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter your mobile number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        );
      case 4:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Bank Account Details</h3>
            <input
              type="text"
              value={bankAccount.sortCode}
              onChange={(e) => setBankAccount({ ...bankAccount, sortCode: e.target.value })}
              placeholder="Sort Code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="text"
              value={bankAccount.accountNumber}
              onChange={(e) => setBankAccount({ ...bankAccount, accountNumber: e.target.value })}
              placeholder="Account Number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        );
      case 5:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Billing Address</h3>
            <textarea
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              placeholder="Enter your billing address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Complete Your Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="mb-4">
          {renderStep()}
        </div>
        <div className="flex justify-between">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-primary text-white rounded-md ml-auto"
          >
            {step === 5 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionModal;