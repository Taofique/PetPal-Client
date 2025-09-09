import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  Pet,
  PetCreateInput,
  PetListResponse,
  PetUpdateInput,
} from "../types/petTypes";
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

// UPDATE /api/pets/:id {message, pet}
export const updatePet = createAsyncThunk<
  Pet,
  { id: number; updates: PetUpdateInput },
  { rejectValue: string }
>("pets/update", async ({ id, updates }, { rejectWithValue }) => {
  try {
    const res = await api.put<{ message: string; pet: Pet }>(
      `/api/pets/${id}`,
      updates
    );
    return res.pet;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Failed to update pet");
  }
});

// DELETE /api/pets/:id {message}
export const deletePet = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("pets/delete", async (id, { rejectWithValue }) => {
  try {
    await api.del<{ message: string }>(`/api/pets/${id}`);
    return id;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Failed to delete pet");
  }
});
