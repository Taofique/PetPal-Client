import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import type { Pet } from '../types/PetType';

const EditPetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState<Pet | null>(null);
  const [nickname, setNickname] = useState('');
  const [species, setSpecies] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await api.get(`/pets/${id}`);
        const petData = response.data.pet;
        setPet(petData);
        setNickname(petData.nickname);
        setSpecies(petData.species);
        setOwnerId(String(petData.ownerId));
      } catch (error) {
        console.error('Error fetching pet', error);
      }
    };
    fetchPet();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('species', species);
    formData.append('ownerId', ownerId);
    if (photo) formData.append('photo', photo);

    try {
      await api.put(`/pets/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Pet updated successfully!');
      setTimeout(() => navigate(`/pets/${id}`), 1000);
    } catch (error) {
      setMessage('Error updating pet');
    }
  };

  if (!pet) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Pet</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Nickname" />
        <input value={species} onChange={e => setSpecies(e.target.value)} placeholder="Species" />
        <input value={ownerId} onChange={e => setOwnerId(e.target.value)} placeholder="Owner ID" />
        <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files?.[0] || null)} />
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditPetForm;
