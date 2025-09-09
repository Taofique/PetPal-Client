import { createSlice } from "@reduxjs/toolkit";
import type { PetState } from "../../types/petTypes";
import {
  createPet,
  deletePet,
  fetchPets,
  updatePet,
} from "../../services/petServices";

const initialState: PetState = {
  items: [],
  total: 0,
  page: 1,
  pageSize: 10,
  status: "idle",
  error: null,
};

const petSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    clearPetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchPets
    builder
      .addCase(fetchPets.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        //.addCase registers a case reducer for a specific action type
        state.status = "succeeded";
        state.items = action.payload.pets;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to load pets";
      });

    // createPet
    builder
      .addCase(createPet.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createPet.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createPet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to create pet";
      });

    //updatePet
    builder
      .addCase(updatePet.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updatePet.fulfilled, (state, action) => {
        state.status = "succeeded";
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(updatePet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to update pet";
      });

    //delete
    builder
      .addCase(deletePet.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((p) => p.id !== action.payload);
        state.total = Math.max(0, state.total - 1);
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to delete pets";
      });
  },
});

export const { clearPetError } = petSlice.actions;
export default petSlice.reducer;
