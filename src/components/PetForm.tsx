import { useState } from 'react';
import api from '../api/api';

const PetForm = () => {
  const [nickname, setNickname] = useState('');
  const [species, setSpecies] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('species', species);
    formData.append('ownerId', ownerId);
    if (photo) formData.append('photo', photo);

    try {
      await api.post('/pets', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('✅Pet added successfully!');
      setNickname('');
      setSpecies('');
      setOwnerId('');
    } catch (error) {
      setMessage('❌ Error adding pet');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Pet</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white shadow-md rounded-2xl p-6 space-y-4"
      >
        <input
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="Nickname"
          className="w-full border rounded-lg p-2 focus:outline:none focus:ring-2 focus:ring-blue-400"
        />
        <input
          value={species}
          onChange={e => setSpecies(e.target.value)}
          placeholder="Species"
          className="w-full border rounded-lg p-2 focus:outline:none focus:ring-2 focus:ring-blue-400"
        />
        <input
          value={ownerId}
          onChange={e => setOwnerId(e.target.value)}
          placeholder="Owner ID"
          className="w-full border rounded-lg p-2 focus:outline:none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setPhoto(e.target.files?.[0] || null)}
          className="w-full border rounded-lg p-2 text-gray-600"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          Save
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default PetForm;
