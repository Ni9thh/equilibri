import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../context/QuestionnaireContext';
import { motion } from 'framer-motion';
import { calculateScores, getDiagnosis } from '../utils/scoring';

export default function SelfReflectionResults() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuestionnaire();
  
  const scores = calculateScores(state.answers);
  const result = getDiagnosis(scores);

  const getResultColor = () => {
    switch (result.type) {
      case 'depression':
        return result.severity === 'severe' ? 'bg-red-50' : 'bg-orange-50';
      case 'mania':
        return result.severity === 'severe' ? 'bg-purple-50' : 'bg-yellow-50';
      default:
        return 'bg-green-50';
    }
  };

  const getResultTextColor = () => {
    switch (result.type) {
      case 'depression':
        return result.severity === 'severe' ? 'text-red-800' : 'text-orange-800';
      case 'mania':
        return result.severity === 'severe' ? 'text-purple-800' : 'text-yellow-800';
      default:
        return 'text-green-800';
    }
  };

  const getEnergyAndMoodInsight = () => {
    const { mood, emotional } = state.answers;
    if (result.type === 'mania') {
      return "Your responses indicate elevated mood and energy levels, which could suggest a manic episode.";
    } else if (result.type === 'depression') {
      return "Your responses indicate lower mood and energy levels, which could suggest a depressive episode.";
    }
    return "Your energy and mood levels appear to be within a balanced range.";
  };

  const getSleepInsight = () => {
    const { sleep } = state.answers;
    if (sleep.lessSleep === 'yes' && result.type === 'mania') {
      return "Your decreased need for sleep while maintaining energy is a common sign of mania.";
    } else if (sleep.moreSleep === 'yes' && result.type === 'depression') {
      return "Your increased sleep and difficulty getting out of bed are common symptoms of depression.";
    }
    return "Your sleep patterns appear to be relatively stable.";
  };

  const getRecommendations = () => {
    switch (result.type) {
      case 'depression':
        return result.severity === 'severe' 
          ? "Given the severity of your depressive symptoms, it's crucial to contact a mental health professional immediately."
          : "Consider scheduling an appointment with a mental health professional to discuss your symptoms.";
      case 'mania':
        return result.severity === 'severe'
          ? "Your manic symptoms appear severe. Please seek immediate professional help to ensure your safety."
          : "It's recommended to consult with a mental health professional about your elevated mood symptoms.";
      default:
        return "Continue monitoring your mood and maintaining your current wellness routine.";
    }
  };

  const handleStartNew = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8"
    >
      <h2 className="text-2xl font-bold text-green-800 mb-6">Self-Reflection Results</h2>

      <div className="space-y-8">
        {/* Overall Assessment */}
        <div className={`${getResultColor()} rounded-lg p-8 text-center`}>
          <h3 className={`text-xl font-semibold ${getResultTextColor()} mb-4`}>
            Overall Assessment
          </h3>
          <div className={`text-3xl font-bold ${getResultTextColor()} mb-6`}>
            {result.diagnosis}
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm mt-6 border-t pt-6">
            <div>
              <div className="font-semibold mb-1">Depression Score</div>
              <div className="text-lg">{scores.depressionScore}/30</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Mania Score</div>
              <div className="text-lg">{scores.maniaScore}/30</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Neutral Score</div>
              <div className="text-lg">{scores.neutralScore}/20</div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Key Insights</h3>
          <div className="space-y-4 text-blue-700">
            <p>{getEnergyAndMoodInsight()}</p>
            <p>{getSleepInsight()}</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3">Recommendations</h3>
          <p className="text-green-700">{getRecommendations()}</p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">Important Notice</h3>
          <p className="text-yellow-700 mb-4">
            This assessment is not a diagnostic tool. The results are based on your responses
            and should be used only as a general guide. For accurate diagnosis and treatment,
            please consult with a qualified mental health professional.
          </p>
          <div className="space-y-2 text-yellow-700">
            <p className="font-semibold">Emergency Resources:</p>
            <ul className="list-disc pl-5">
              <li>Emergency Services: 911</li>
              <li>National Suicide Prevention Lifeline: 988</li>
              <li>Crisis Text Line: Text HOME to 741741</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button
            onClick={handleStartNew}
            className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors"
          >
            Start New Assessment
          </button>
        </div>
      </div>
    </motion.div>
  );
}