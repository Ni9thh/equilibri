import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../context/QuestionnaireContext';
import { motion } from 'framer-motion';

export default function Summary() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuestionnaire();

  const getRecommendation = () => {
    const { mood, sleep, activity, symptoms } = state.answers;
    
    if (mood >= 3 && symptoms.some(s => symptoms.mania.includes(s))) {
      return 'Your responses indicate elevated mood and manic symptoms. Consider contacting your healthcare provider.';
    } else if (mood <= -3 && symptoms.some(s => symptoms.depression.includes(s))) {
      return 'Your responses indicate low mood and depressive symptoms. Consider reaching out to your support system or healthcare provider.';
    } else if (sleep < 6 || sleep > 10) {
      return 'Your sleep patterns may be affecting your well-being. Try to maintain a consistent sleep schedule.';
    } else if (activity <= 3) {
      return 'Consider engaging in more physical activity to help regulate your mood.';
    }
    return 'Continue monitoring your symptoms and maintaining your wellness routine.';
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8"
    >
      <h2 className="text-2xl font-bold text-green-800 mb-6">Daily Summary</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Mood</h3>
          <p className="text-gray-600">
            Level: {state.answers.mood} 
            ({state.answers.mood > 0 ? 'Elevated' : state.answers.mood < 0 ? 'Low' : 'Neutral'})
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Sleep</h3>
          <p className="text-gray-600">{state.answers.sleep} hours</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Activity Level</h3>
          <p className="text-gray-600">{state.answers.activity}/10</p>
        </div>

        {state.answers.symptoms.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Current Symptoms</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {state.answers.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-medium text-green-800 mb-2">Recommendation</h3>
          <p className="text-green-700">{getRecommendation()}</p>
        </div>

        <div className="pt-4 flex justify-center">
          <button
            onClick={handleReset}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Start New Entry
          </button>
        </div>
      </div>
    </motion.div>
  );
}