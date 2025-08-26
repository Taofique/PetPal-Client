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
      setMessage('Pet added successfully!');
      setNickname('');
      setSpecies('');
      setOwnerId('');
    } catch (error) {
      setMessage('Error adding pet');
    }
  };

  return (
    <div>
      <h2>Add Pet</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Nickname" />
        <input value={species} onChange={e => setSpecies(e.target.value)} placeholder="Species" />
        <input value={ownerId} onChange={e => setOwnerId(e.target.value)} placeholder="Owner ID" />
        <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files?.[0] || null)} />
        <button type="submit">Save</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PetForm;
