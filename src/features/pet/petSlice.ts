import { createSlice } from "@reduxjs/toolkit";
import type { PetState } from "../../types/petTypes";
import { createPet, fetchPets } from "../../services/petServices";

const initialState: PetState = {
  items: [],
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
        state.status = "succeeded";
        state.items = action.payload;
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
      })
      .addCase(createPet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to create pet";
      });
  },
});

export const { clearPetError } = petSlice.actions;
export default petSlice.reducer;
