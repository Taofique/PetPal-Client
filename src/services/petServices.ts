import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Pet, PetCreateInput } from "../types/petTypes";
import { api } from "../utils/api";
import type { RootState } from "../app/store";

// GET /api/pets
export const fetchPets = createAsyncThunk<Pet[], void, { rejectValue: string }>(
  "pets/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.get<Pet[]>("/api/pets");
      return data;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? "Failed to load pets");
    }
  }
);

// POST /api/pets (multipart)
export const createPet = createAsyncThunk<
  Pet,
  PetCreateInput,
  { state: RootState; rejectValue: string }
>("pets/create", async (input, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const ownerId = input.ownerId ?? state.auth.user?.id ?? undefined; // if your backend uses auth to infer owner, you can omit it

    const form = new FormData();
    form.append("nickname", input.nickname);
    form.append("species", input.species);
    if (ownerId !== undefined) form.append("ownerId", String(ownerId));
    if (input.photo) form.append("photo", input.photo);

    const created = await api.postForm<Pet>("/api/pets", form);
    return created;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Failed to create pet");
  }
});
