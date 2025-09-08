import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import petReducer from "../features/pet/petSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
