import { useEffect, useState } from 'react';
import api from '../api/api';
import type { Pet } from '../types/PetType';
import PetCard from './PetCard';

const TrendingPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await api.get('/pets');
        //  pick first 3 as "trending"
        setPets(res.data.pets.slice(0, 3));
      } catch (err) {
        console.error('Error loading pets', err);
      }
    };
    fetchPets();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Trending Pets</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {pets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default TrendingPets;
