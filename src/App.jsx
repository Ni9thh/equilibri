import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import MoodQuestionnaire from './pages/questionnaire/MoodQuestionnaire';
import SleepQuestionnaire from './pages/questionnaire/SleepQuestionnaire';
import ActivityQuestionnaire from './pages/questionnaire/ActivityQuestionnaire';
import SymptomsQuestionnaire from './pages/questionnaire/SymptomsQuestionnaire';
import BehavioralQuestionnaire from './pages/questionnaire/BehavioralQuestionnaire';
import PhysicalQuestionnaire from './pages/questionnaire/PhysicalQuestionnaire';
import SelfReflectionResults from './pages/SelfReflectionResults';
import { QuestionnaireProvider } from './context/QuestionnaireContext';

export default function App() {
  return (
    <QuestionnaireProvider>
      <Router basename="/equilibri">
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">
          <div className="container max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-green-800 text-center mb-8 font-inter tracking-tight">
              EQUILIBRI
            </h1>
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/personal-info" element={<PersonalInfoPage />} />
              <Route path="/questionnaire/mood" element={<MoodQuestionnaire />} />
              <Route path="/questionnaire/sleep" element={<SleepQuestionnaire />} />
              <Route path="/questionnaire/activity" element={<ActivityQuestionnaire />} />
              <Route path="/questionnaire/symptoms" element={<SymptomsQuestionnaire />} />
              <Route path="/questionnaire/behavioral" element={<BehavioralQuestionnaire />} />
              <Route path="/questionnaire/physical" element={<PhysicalQuestionnaire />} />
              <Route path="/results" element={<SelfReflectionResults />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QuestionnaireProvider>
  );
}