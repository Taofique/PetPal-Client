export interface Pet {
  id: number;
  ownerId: number;
  nickname: string;
  species: string;
  nextFeed: string | null;
  nextVet: string | null;
  photo: string | null;
}
