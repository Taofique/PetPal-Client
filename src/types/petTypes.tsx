export interface Pet {
  id: number;
  name: string;
  nickname: string;
  species: string;
  age: number;
  imageUrl: string | null;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface PetCreateInput {
  name: string;
  nickname: string;
  species: string;
  age: number;
  imageUrl?: string | null;
}

export interface PetListResponse {
  total: number;
  page: number;
  pageSize: number;
  pets: Pet[];
}
export interface PetState {
  items: Pet[];
  total: number;
  page: number;
  pageSize: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
