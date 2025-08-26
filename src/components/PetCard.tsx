import { Link } from 'react-router-dom';
import type { Props } from '../types/Props';
import placeholder from '../assets/placeholder.jpeg';

const PetCard = ({ pet }: Props) => {
  const photoUrl = pet.photo?.startsWith('http')
    ? pet.photo // external URL (Cat/Dog API)
    : pet.photo
    ? `http://localhost:4000/${pet.photo.replace(/\\/g, '/')}` // local uploads
    : placeholder; // fallback image

  return (
    <Link to={`/pets/${pet.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center">
        <img src={photoUrl} alt={pet.nickname} className="w-32 h-32 object-cover rounded-full mb-3" />
        <h2 className="text-lg font-semibold"> {pet.nickname}</h2>
        <p className="text-gray-600">{pet.species}</p>
        {pet.nextVet && (
          <p className="text-sm teext-gray-500"> Next Vet: {new Date(pet.nextVet).toLocaleDateString()}</p>
        )}
      </div>
    </Link>
  );
};

export default PetCard;
