import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import { motion } from 'framer-motion';

export default function BehavioralQuestionnaire() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuestionnaire();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/questionnaire/physical');
  };

  const handleAnswerChange = (question, value) => {
    dispatch({
      type: 'SET_ANSWER',
      category: 'behavioral',
      payload: {
        ...state.answers.behavioral,
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
      <h2 className="text-2xl font-bold text-green-800 mb-6">Behavioral Changes</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Question 16 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            16. Have you been more talkative than usual, or do you feel compelled to talk?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="talkative"
                value="yes"
                checked={state.answers.behavioral?.talkative === 'yes'}
                onChange={() => handleAnswerChange('talkative', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="talkative"
                value="no"
                checked={state.answers.behavioral?.talkative === 'no'}
                onChange={() => handleAnswerChange('talkative', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        {/* Question 17 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            17. Have you been withdrawing from friends, family or activities?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="withdrawing"
                value="yes"
                checked={state.answers.behavioral?.withdrawing === 'yes'}
                onChange={() => handleAnswerChange('withdrawing', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="withdrawing"
                value="no"
                checked={state.answers.behavioral?.withdrawing === 'no'}
                onChange={() => handleAnswerChange('withdrawing', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        {/* Question 18 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            18. Have you engaged in risky or impulsive behavior recently (e.g., spending sprees, unsafe activities, etc.)?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="riskyBehavior"
                value="yes"
                checked={state.answers.behavioral?.riskyBehavior === 'yes'}
                onChange={() => handleAnswerChange('riskyBehavior', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="riskyBehavior"
                value="no"
                checked={state.answers.behavioral?.riskyBehavior === 'no'}
                onChange={() => handleAnswerChange('riskyBehavior', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        {/* Question 19 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            19. Are you finding it difficult to complete daily responsibilities?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="dailyResponsibilities"
                value="yes"
                checked={state.answers.behavioral?.dailyResponsibilities === 'yes'}
                onChange={() => handleAnswerChange('dailyResponsibilities', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="dailyResponsibilities"
                value="no"
                checked={state.answers.behavioral?.dailyResponsibilities === 'no'}
                onChange={() => handleAnswerChange('dailyResponsibilities', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        <div className="pt-6 flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/questionnaire/symptoms')}
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