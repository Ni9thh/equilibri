import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import { motion } from 'framer-motion';

export default function SleepQuestionnaire() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuestionnaire();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/questionnaire/activity');
  };

  const handleAnswerChange = (question, value) => {
    dispatch({
      type: 'SET_ANSWER',
      category: 'sleep',
      payload: {
        ...state.answers.sleep,
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
      <h2 className="text-2xl font-bold text-green-800 mb-6">Sleep Patterns</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Question 5 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            5. Did you sleep well last night?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="sleepQuality"
                value="yes"
                checked={state.answers.sleep?.sleepQuality === 'yes'}
                onChange={() => handleAnswerChange('sleepQuality', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sleepQuality"
                value="no"
                checked={state.answers.sleep?.sleepQuality === 'no'}
                onChange={() => handleAnswerChange('sleepQuality', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        {/* Question 6 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            6. Have you needed significantly less sleep than usual and still feel energized?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="lessSleep"
                value="yes"
                checked={state.answers.sleep?.lessSleep === 'yes'}
                onChange={() => handleAnswerChange('lessSleep', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="lessSleep"
                value="no"
                checked={state.answers.sleep?.lessSleep === 'no'}
                onChange={() => handleAnswerChange('lessSleep', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        {/* Question 7 */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            7. Have you been sleeping more than usual or struggling to get out of bed?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="moreSleep"
                value="yes"
                checked={state.answers.sleep?.moreSleep === 'yes'}
                onChange={() => handleAnswerChange('moreSleep', 'yes')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="moreSleep"
                value="no"
                checked={state.answers.sleep?.moreSleep === 'no'}
                onChange={() => handleAnswerChange('moreSleep', 'no')}
                className="mr-2 text-green-500 focus:ring-green-500"
              />
              No
            </label>
          </div>
        </div>

        <div className="pt-6 flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/questionnaire/mood')}
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