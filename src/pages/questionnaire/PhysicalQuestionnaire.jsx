import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import { motion } from 'framer-motion';

export default function PhysicalQuestionnaire() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuestionnaire();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/results');
  };

  const handleAnswerChange = (question, value) => {
    dispatch({
      type: 'SET_ANSWER',
      category: 'physical',
      payload: {
        ...state.answers.physical,
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
      <h2 className="text-2xl font-bold text-green-800 mb-6">Physical Symptoms</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Question 20 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            20. Do you feel unusually tensed or relaxed?
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={state.answers.physical?.tension || 3}
            onChange={(e) => handleAnswerChange('tension', parseInt(e.target.value))}
            className="w-full accent-green-500"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Very Tense (1)</span>
            <span>Very Relaxed (5)</span>
          </div>
        </div>

        {/* Question 21 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            21. Are you experiencing unexplained physical discomfort?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="discomfort"
                value="yes"
                checked={state.answers.physical?.discomfort === 'yes'}
                onChange={() => handleAnswerChange('discomfort', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="discomfort"
                value="no"
                checked={state.answers.physical?.discomfort === 'no'}
                onChange={() => handleAnswerChange('discomfort', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        <div className="pt-6 flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/questionnaire/behavioral')}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            View Results
          </button>
        </div>
      </form>
    </motion.div>
  );
}