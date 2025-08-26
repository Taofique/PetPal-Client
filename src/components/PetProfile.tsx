import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Pet } from '../types/PetType';
import api from '../api/api';
import CareLogs from './CareLogs';
import { Link } from 'react-router-dom';

// Simple reminder scheduling
const scheduleReminder = (petName: string, date: string | null) => {
  if (!date) return;
  const ms = new Date(date).getTime() - Date.now();
  if (ms > 0 && 'Notification' in window) {
    Notification.requestPermission().then(perm => {
      if (perm === 'granted') {
        setTimeout(() => {
          new Notification(`Reminder: ${petName}'s appointment today!`);
        }, ms);
      }
    });
  }
};

const PetProfile = () => {
  const { id } = useParams();
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await api.get(`/pets/${id}`);
        setPet(response.data.pet);

        // schedule local reminders
        if (response.data.pet.nextVet) {
          scheduleReminder(response.data.pet.nickname, response.data.pet.nextVet);
        }
        if (response.data.pet.nextFeed) {
          scheduleReminder(response.data.pet.nickname, response.data.pet.nextFeed);
        }
      } catch (error) {
        console.error('Error fetching pet details:', error);
      }
    };
    fetchPet();
  }, [id]);

  if (!pet) return <p>Loading...</p>;

  return (
    <div>
      <h1>{pet.nickname}</h1>
      <p>Species: {pet.species}</p>
      <p>Owner ID: {pet.ownerId}</p>
      {pet.nextFeed && <p>Next Feed: {new Date(pet.nextFeed).toLocaleDateString()}</p>}
      {pet.nextVet && <p>Next Vet: {new Date(pet.nextVet).toLocaleDateString()}</p>}
      {pet.photo && (
        <img src={`http://localhost:4000/${pet.photo.replace(/\\/g, '/')}`} alt={pet.nickname} width="200" />
      )}
      <Link to={`/pets/${pet.id}/edit`}>Edit Pet</Link>
      <CareLogs petId={pet.id} />
    </div>
  );
};

export default PetProfile;
