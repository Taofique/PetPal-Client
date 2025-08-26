import { useEffect, useState } from 'react';
import api from '../api/api';
import type { Pet } from '../types/PetType';

const TrendingPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await api.get('/pets');
        // just pick first 3 as "trending"
        setPets(res.data.pets.slice(0, 3));
      } catch (err) {
        console.error('Error loading pets', err);
      }
    };
    fetchPets();
  }, []);

  return (
    <div>
      <h2>Trending Pets</h2>
      <ul>
        {pets.map(pet => (
          <li key={pet.id}>
            {pet.nickname} ({pet.species})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPets;
