export interface Pet {
  id: number;
  nickname: string;
  species: string;
  ownerId: string;
  photoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PetCreateInput {
  nickname: string;
  species: string;
  ownerId?: number;
  photo?: File | null;
}

export interface PetState {
  items: Pet[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
