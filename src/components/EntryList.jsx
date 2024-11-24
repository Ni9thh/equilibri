import { format } from 'date-fns';

export default function EntryList({ entries, moodScale }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Recent Entries</h2>
      <div className="space-y-4">
        {entries.slice().reverse().map((entry, index) => (
          <div key={index} className="border-b border-gray-100 pb-4">
            <div className="text-sm text-gray-500">
              {format(new Date(entry.timestamp), 'PPp')}
            </div>
            <div className="mt-1">
              <span className="text-gray-800 font-medium">
                {moodScale[entry.moodScore]}
              </span>
              <span className="text-gray-500 text-sm ml-2">
                (Energy: {entry.energyLevel}/10)
              </span>
            </div>
            {entry.currentSymptoms.length > 0 && (
              <div className="mt-2">
                <div className="text-sm text-gray-600">Symptoms:</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {entry.currentSymptoms.map((symptom, i) => (
                    <span
                      key={i}
                      className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {entry.notes && (
              <div className="mt-2 text-sm text-gray-600">
                {entry.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}