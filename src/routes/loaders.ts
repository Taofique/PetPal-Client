import { redirect } from "react-router-dom";
import { getToken } from "../utils/authToken";

export async function requireAuth() {
  const token = getToken();

  if (!token) {
    throw redirect("/login");
  }
  return null;
  3;
}
