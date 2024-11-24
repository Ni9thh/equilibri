import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProgressBar() {
  const location = useLocation();
  const steps = [
    { path: '/personal-info', label: 'Personal Info' },
    { path: '/questionnaire/mood', label: 'Mood' },
    { path: '/questionnaire/sleep', label: 'Sleep' },
    { path: '/questionnaire/activity', label: 'Activity' },
    { path: '/questionnaire/symptoms', label: 'Symptoms' }
  ];

  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);
  const progress = currentStepIndex === -1 ? 0 : (currentStepIndex / (steps.length - 1)) * 100;

  if (location.pathname === '/' || location.pathname === '/summary') return null;

  return (
    <div className="mb-8">
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-green-600">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
          />
        </div>
      </div>
    </div>
  );
}