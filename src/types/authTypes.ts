export interface IUserCreateInput {
  name: string;
  email: string;
  password: string;
  imageUrl?: string | null;
}

export interface IUserLoginInput {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  imageUrl: string | null;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export type RequestError = string;

export interface AuthState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
