import { useEffect, useState } from "react";
import api from "../api/api";
import type { Pet } from "../types/petTypes";
import PetCard from "./PetCard";

const PetList = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await api.get("/pets");
        setPets(response.data.pets);
      } catch (error) {
        console.error("Error fetching pets", error);
      }
    };
    fetchPets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2x1 font-bold mb-4">Pets List</h1>
      <div className="grid gap-6 grid-cols-1 smg:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default PetList;
