import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MoodTracker from '../components/MoodTracker';
import EntryList from '../components/EntryList';
import { moodScale, symptoms } from '../data/constants';

export default function TrackerPage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('moodEntries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const personalInfo = localStorage.getItem('personalInfo');
    if (!personalInfo) {
      navigate('/personal-info');
    }
  }, [navigate]);

  const handleNewEntry = (entry) => {
    const newEntries = [...entries, { ...entry, timestamp: new Date().toISOString() }];
    setEntries(newEntries);
    localStorage.setItem('moodEntries', JSON.stringify(newEntries));
  };

  return (
    <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
      <MoodTracker 
        onSubmit={handleNewEntry}
        moodScale={moodScale}
        symptoms={symptoms}
      />
      <EntryList entries={entries} moodScale={moodScale} />
    </div>
  );
}