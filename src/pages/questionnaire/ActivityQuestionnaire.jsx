import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import { motion } from 'framer-motion';

export default function ActivityQuestionnaire() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuestionnaire();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/questionnaire/symptoms');
  };

  const handleAnswerChange = (question, value) => {
    dispatch({
      type: 'SET_ANSWER',
      category: 'emotional',
      payload: {
        ...state.answers.emotional,
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
      <h2 className="text-2xl font-bold text-green-800 mb-6">Mood and Emotional State</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Question 8 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            8. Do you feel unusually irritable or easily annoyed?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="irritability"
                value="yes"
                checked={state.answers.emotional?.irritability === 'yes'}
                onChange={() => handleAnswerChange('irritability', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="irritability"
                value="no"
                checked={state.answers.emotional?.irritability === 'no'}
                onChange={() => handleAnswerChange('irritability', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        {/* Question 9 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            9. Are you experiencing moments of euphoria or extreme happiness that feel out of the ordinary?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="euphoria"
                value="yes"
                checked={state.answers.emotional?.euphoria === 'yes'}
                onChange={() => handleAnswerChange('euphoria', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="euphoria"
                value="no"
                checked={state.answers.emotional?.euphoria === 'no'}
                onChange={() => handleAnswerChange('euphoria', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        {/* Question 10 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            10. Have you felt hopeless or that nothing will improve?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="hopelessness"
                value="yes"
                checked={state.answers.emotional?.hopelessness === 'yes'}
                onChange={() => handleAnswerChange('hopelessness', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="hopelessness"
                value="no"
                checked={state.answers.emotional?.hopelessness === 'no'}
                onChange={() => handleAnswerChange('hopelessness', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        {/* Question 11 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            11. How would you describe your overall mood?
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={state.answers.emotional?.overallMood || 3}
            onChange={(e) => handleAnswerChange('overallMood', parseInt(e.target.value))}
            className="w-full accent-green-500"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Very Negative (1)</span>
            <span>Very Positive (5)</span>
          </div>
        </div>

        <div className="pt-6 flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/questionnaire/sleep')}
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