import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import { motion } from 'framer-motion';

export default function SymptomsQuestionnaire() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuestionnaire();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/questionnaire/behavioral');
  };

  const handleAnswerChange = (question, value) => {
    dispatch({
      type: 'SET_ANSWER',
      category: 'thoughts',
      payload: {
        ...state.answers.thoughts,
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
      <h2 className="text-2xl font-bold text-green-800 mb-6">Thought Patterns</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Question 12 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            12. Are your thoughts racing or difficult to control?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="racingThoughts"
                value="yes"
                checked={state.answers.thoughts?.racingThoughts === 'yes'}
                onChange={() => handleAnswerChange('racingThoughts', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="racingThoughts"
                value="no"
                checked={state.answers.thoughts?.racingThoughts === 'no'}
                onChange={() => handleAnswerChange('racingThoughts', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        {/* Question 13 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            13. Have you been struggling with slow or sluggish thinking?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="sluggishThinking"
                value="yes"
                checked={state.answers.thoughts?.sluggishThinking === 'yes'}
                onChange={() => handleAnswerChange('sluggishThinking', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sluggishThinking"
                value="no"
                checked={state.answers.thoughts?.sluggishThinking === 'no'}
                onChange={() => handleAnswerChange('sluggishThinking', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        {/* Question 14 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            14. Have you had difficulty making decisions or feel overwhelmed by small choices?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="decisionDifficulty"
                value="yes"
                checked={state.answers.thoughts?.decisionDifficulty === 'yes'}
                onChange={() => handleAnswerChange('decisionDifficulty', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="decisionDifficulty"
                value="no"
                checked={state.answers.thoughts?.decisionDifficulty === 'no'}
                onChange={() => handleAnswerChange('decisionDifficulty', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        {/* Question 15 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            15. Are you having grandiose or ambitious thoughts about your future?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="grandioseThoughts"
                value="yes"
                checked={state.answers.thoughts?.grandioseThoughts === 'yes'}
                onChange={() => handleAnswerChange('grandioseThoughts', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="grandioseThoughts"
                value="no"
                checked={state.answers.thoughts?.grandioseThoughts === 'no'}
                onChange={() => handleAnswerChange('grandioseThoughts', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        <div className="pt-6 flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/questionnaire/activity')}
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