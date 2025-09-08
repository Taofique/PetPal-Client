import { getToken } from "./authToken";

const API_BASE = "http://localhost:4000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const isForm = init?.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(init?.headers as Record<string, string> | undefined),
  };

  // Only set JSON header if we're not sending FormData
  if (!isForm && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...init,
    headers,
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const message =
      (isJson && (data?.message || data?.error)) ||
      `Request failed with ${res.status}`;
    throw new Error(message);
  }
  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  del: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  // Multipart helpers
  postForm: <T>(path: string, form: FormData) =>
    request<T>(path, { method: "POST", body: form }),
  putForm: <T>(path: string, form: FormData) =>
    request<T>(path, { method: "PUT", body: form }),
};
