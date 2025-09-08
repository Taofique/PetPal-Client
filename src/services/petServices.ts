import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Pet, PetCreateInput, PetListResponse } from "../types/petTypes";
import { api } from "../utils/api";
import type { RootState } from "../app/store";

// GET /api/pets
export const fetchPets = createAsyncThunk<
  PetListResponse,
  { page?: number; limit?: number } | void,
  { rejectValue: string }
>("pets/fetchAll", async (args, { rejectWithValue }) => {
  try {
    const page = args?.page ?? 1;
    const limit = args?.limit ?? 10;
    const qs = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    const data = await api.get<PetListResponse>(`/api/pets?${qs.toString()}`);
    return data;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Failed to load pets");
  }
});

// POST /api/pets (multipart)
export const createPet = createAsyncThunk<
  Pet,
  PetCreateInput,
  { state: RootState; rejectValue: string }
>("pets/create", async (input, { rejectWithValue }) => {
  try {
    const res = await api.post<{ message: string; pet: Pet }>(
      "/api/pets",
      input
    );
    return res.pet;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Failed to create pet");
  }
});
