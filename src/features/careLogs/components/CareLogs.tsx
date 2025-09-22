import { useEffect, useState } from 'react';

interface Log {
  type: string;
  date: string;
}

const CareLogs = ({ petId }: { petId: number }) => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`logs-${petId}`);
    if (saved) setLogs(JSON.parse(saved));
  }, [petId]);

  const addLog = (type: string) => {
    const newLogs = [...logs, { type, date: new Date().toISOString() }];
    setLogs(newLogs);
    localStorage.setItem(`logs-${petId}`, JSON.stringify(newLogs));
  };

  const streak = () => {
    const days = new Set(logs.map(l => l.date.slice(0, 10)));
    return days.size;
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Care Logs</h3>

      {/* Log buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => addLog('Feed')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Log Feed
        </button>
        <button
          onClick={() => addLog('Walk')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Log Walk
        </button>
        <button
          onClick={() => addLog('Vet Visit')}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
        >
          Log Vet Visit
        </button>
      </div>

      {/* Logs list */}
      <div className="space-y-2">
        {logs.length === 0 ? (
          <p className="text-gray-500">No logs yet. Start tracking your pet’s care!</p>
        ) : (
          logs.map((l, i) => (
            <div key={i} className="bg-gray-50 border rounded-lg p-2 flex justify-between items-center">
              <span className="font-medium">{l.type}</span>
              <span className="text-sm text-gray-500">{new Date(l.date).toLocaleString()}</span>
            </div>
          ))
        )}
      </div>

      {/* Streak summary */}
      <p className="mt-4 text-sm text-gray-700">
        🔥 Current streak: <span className="font-semibold">{streak()}</span> days
      </p>
    </div>
  );
};

export default CareLogs;
