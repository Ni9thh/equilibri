import React, { useState } from 'react';

export default function PersonalInfo({ onSubmit, savedInfo }) {
  const [showOtherPronouns, setShowOtherPronouns] = useState(
    savedInfo?.pronouns === 'other'
  );
  
  const [formData, setFormData] = useState({
    name: savedInfo?.name || '',
    birthDate: savedInfo?.birthDate || '',
    pronouns: savedInfo?.pronouns || '',
    customPronouns: savedInfo?.customPronouns || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePronounChange = (value) => {
    setShowOtherPronouns(value === 'other');
    setFormData({
      ...formData,
      pronouns: value,
      customPronouns: value !== 'other' ? '' : formData.customPronouns
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-bold text-green-800 mb-6 font-inter">
        Personal Information
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name / Preferred Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            id="birthDate"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="pronouns" className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Pronouns
          </label>
          <select
            id="pronouns"
            value={formData.pronouns}
            onChange={(e) => handlePronounChange(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="">Select pronouns</option>
            <option value="he/him">He/Him</option>
            <option value="she/her">She/Her</option>
            <option value="they/them">They/Them</option>
            <option value="other">Other</option>
          </select>
        </div>

        {showOtherPronouns && (
          <div>
            <label htmlFor="customPronouns" className="block text-sm font-medium text-gray-700 mb-2">
              Custom Pronouns
            </label>
            <input
              type="text"
              id="customPronouns"
              value={formData.customPronouns}
              onChange={(e) => setFormData({ ...formData, customPronouns: e.target.value })}
              placeholder="Enter your preferred pronouns"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Save Information
          </button>
        </div>
      </form>
    </div>
  );
}