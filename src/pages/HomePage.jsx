import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-bold text-green-800 mb-6 font-inter">
        Welcome to EQUILIBRI
      </h2>
      
      <div className="space-y-6 text-gray-600">
        <p className="leading-relaxed">
          EQUILIBRI is designed to help you track and understand your mood patterns, 
          serving as a supportive tool in your mental health journey.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
          <h3 className="font-semibold text-amber-800 mb-2">Important Disclaimer</h3>
          <p className="text-amber-700">
            This application is not a replacement for professional medical advice, 
            diagnosis, or treatment. It is designed to be used as a supplementary 
            tool to help track your mood patterns and maintain awareness of your 
            mental state.
          </p>
        </div>

        <h3 className="font-semibold text-green-800 text-lg mt-6 mb-3">
          How to Use EQUILIBRI
        </h3>
        
        <ul className="space-y-3 list-disc pl-5">
          <li>Track your daily mood and energy levels</li>
          <li>Record any symptoms you're experiencing</li>
          <li>Add personal notes about your day</li>
          <li>Review your patterns over time</li>
          <li>Receive general wellness suggestions based on your entries</li>
        </ul>

        <div className="bg-green-50 p-4 rounded-lg mt-6">
          <h3 className="font-semibold text-green-800 mb-2">
            Emergency Resources
          </h3>
          <p className="text-green-700 mb-3">
            If you're experiencing a mental health emergency, please contact:
          </p>
          <ul className="space-y-2 text-green-700">
            <li>• Emergency Services: 911</li>
            <li>• National Suicide Prevention Lifeline: 988</li>
            <li>• Crisis Text Line: Text HOME to 741741</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/personal-info')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Start Tracking
          </button>
        </div>
      </div>
    </div>
  );
}