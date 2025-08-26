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
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sitter / Toy Swap</h2>
      {/*Availability Form*/}
      <div className="bg-white rounded 2xl shadow-md p-4 mb-6">
        <form onSubmit={submitAvailability} className="flex gap-2">
          <input
            value={availability}
            onChange={e => setAvailability(e.target.value)}
            placeholder="Available dates"
            className="flex-grow border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            Submit
          </button>
        </form>
      </div>

      {/* Bookings list */}
      <div className="space-y-4">
        {bookings.length === 0 ? (
          <p className="text-gray-500">No sitters availability yet!</p>
        ) : (
          bookings.map((b, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-4 hover:shadow-md transition">
              <p className="text-gray-800">{b}</p>
              <p className="text-sm text-gray-500 mt-1">{new Date().toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SitterSwap;
