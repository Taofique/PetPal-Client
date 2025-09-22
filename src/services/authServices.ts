import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  AuthResponse,
  IUserCreateInput,
  IUserLoginInput,
  RequestError,
} from "../features/auth/types/authTypes";
import { setToken } from "../features/auth/utils/authToken";
import { api } from "../utils/api";

export const registerUser = createAsyncThunk<
  AuthResponse,
  IUserCreateInput,
  { rejectValue: RequestError }
>("auth/register", async (input, { rejectWithValue }) => {
  try {
    const data = await api.post<AuthResponse>("/api/auth/register", input);
    setToken(data.token);
    return data;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Registration failed");
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  IUserLoginInput,
  { rejectValue: RequestError }
>("auth/login", async (input, { rejectWithValue }) => {
  try {
    const data = await api.post<AuthResponse>("/api/auth/login", input);
    setToken(data.token);
    return data;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Login failed");
  }
});
