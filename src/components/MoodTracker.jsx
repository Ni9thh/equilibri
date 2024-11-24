import { useState } from 'react';
import { getRecommendation } from '../utils/helpers';

export default function MoodTracker({ onSubmit, moodScale, symptoms }) {
  const [formData, setFormData] = useState({
    moodScore: 0,
    energyLevel: 5,
    currentSymptoms: [],
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      moodScore: 0,
      energyLevel: 5,
      currentSymptoms: [],
      notes: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-medium text-gray-800 mb-6">How are you feeling?</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mood Level
          </label>
          <input
            type="range"
            min="-5"
            max="5"
            step="1"
            value={formData.moodScore}
            onChange={(e) => setFormData({ ...formData, moodScore: parseInt(e.target.value) })}
            className="w-full accent-green-500"
          />
          <div className="text-sm text-gray-600 mt-1">
            {moodScale[formData.moodScore]}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Energy Level
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.energyLevel}
            onChange={(e) => setFormData({ ...formData, energyLevel: parseInt(e.target.value) })}
            className="w-full accent-green-500"
          />
          <div className="text-sm text-gray-600 mt-1">
            {formData.energyLevel}/10
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Symptoms
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[...symptoms.mania, ...symptoms.depression].map((symptom) => (
              <label key={symptom} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.currentSymptoms.includes(symptom)}
                  onChange={(e) => {
                    const symptoms = e.target.checked
                      ? [...formData.currentSymptoms, symptom]
                      : formData.currentSymptoms.filter(s => s !== symptom);
                    setFormData({ ...formData, currentSymptoms: symptoms });
                  }}
                  className="rounded text-green-500"
                />
                <span className="text-sm text-gray-600">{symptom}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            rows="3"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Save Entry
          </button>
        </div>

        {formData.moodScore !== 0 && (
          <div className="mt-4 p-4 bg-green-50 rounded-md">
            <p className="text-sm text-green-800">
              {getRecommendation(formData.moodScore)}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}