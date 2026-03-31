import { cookies } from "next/headers";

import { JWT_ACCESS_COOKIE } from "@/lib/auth-cookies";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has(JWT_ACCESS_COOKIE);
}
