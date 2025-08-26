import { useEffect, useState } from 'react';
import type { Log } from '../types/Logs';

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
      <h3>Care Logs</h3>
      <button onClick={() => addLog('Feed')}>Log Feed</button>
      <button onClick={() => addLog('Walk')}>Log Walk</button>
      <ul>
        {logs.map((l, i) => (
          <li key={i}>
            {l.type} — {new Date(l.date).toLocaleString()}
          </li>
        ))}
      </ul>
      <p>Current streak: {streak()} days</p>
    </div>
  );
};

export default CareLogs;
