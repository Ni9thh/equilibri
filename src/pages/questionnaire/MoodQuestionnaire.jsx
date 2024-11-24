import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import { motion } from 'framer-motion';

export default function MoodQuestionnaire() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuestionnaire();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/questionnaire/sleep');
  };

  const handleAnswerChange = (question, value) => {
    dispatch({
      type: 'SET_ANSWER',
      category: 'mood',
      payload: {
        ...state.answers.mood,
        [question]: value
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8"
    >
      <h2 className="text-2xl font-bold text-green-800 mb-6">Daily Mood and Energy Levels</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Question 1 - Energy Level */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            1. How is your energy level today?
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={state.answers.mood?.energyLevel || 3}
            onChange={(e) => handleAnswerChange('energyLevel', parseInt(e.target.value))}
            className="w-full accent-green-500"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Very Low (1)</span>
            <span>Very High (5)</span>
          </div>
        </div>

        {/* Question 2 - Tiredness/Restlessness */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            2. Do you feel unusually tired or restless?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="tiredness"
                value="yes"
                checked={state.answers.mood?.tiredness === 'yes'}
                onChange={() => handleAnswerChange('tiredness', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="tiredness"
                value="no"
                checked={state.answers.mood?.tiredness === 'no'}
                onChange={() => handleAnswerChange('tiredness', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        {/* Question 3 - Energy Bursts */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            3. Are you experiencing sudden bursts of energy or feel the need to move constantly?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="energyBursts"
                value="yes"
                checked={state.answers.mood?.energyBursts === 'yes'}
                onChange={() => handleAnswerChange('energyBursts', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="energyBursts"
                value="no"
                checked={state.answers.mood?.energyBursts === 'no'}
                onChange={() => handleAnswerChange('energyBursts', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        {/* Question 4 - Focus */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            4. Have you been able to focus on tasks today?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="focus"
                value="yes"
                checked={state.answers.mood?.focus === 'yes'}
                onChange={() => handleAnswerChange('focus', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="focus"
                value="no"
                checked={state.answers.mood?.focus === 'no'}
                onChange={() => handleAnswerChange('focus', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        <div className="pt-6 flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/personal-info')}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Next
          </button>
        </div>
      </form>
    </motion.div>
  );
}