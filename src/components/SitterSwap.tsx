import { useState } from 'react';

const SitterSwap = () => {
  const [availability, setAvailability] = useState('');
  const [bookings, setBookings] = useState<string[]>([]);

  const submitAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    if (availability.trim()) {
      setBookings([...bookings, `Available: ${availability}`]);
      setAvailability('');
    }
  };

  return (
    <div>
      <h2>Sitter / Toy Swap</h2>
      <form onSubmit={submitAvailability}>
        <input value={availability} onChange={e => setAvailability(e.target.value)} placeholder="Available dates" />
        <button type="submit">Submit</button>
      </form>

      <h3>Bookings</h3>
      <ul>
        {bookings.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
};

export default SitterSwap;
