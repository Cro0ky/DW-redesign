import { cookies } from "next/headers";

const AUTH_COOKIE = "auth";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has(AUTH_COOKIE);
}
