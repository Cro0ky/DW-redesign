import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

import { JWT_ACCESS_COOKIE } from "@/lib/auth-cookies";

interface IAccessTokenPayload {
  user_id: string;
}

export const getUserUuid = (): IAccessTokenPayload | null => {
  const jwt = getCookie(JWT_ACCESS_COOKIE);

  if (!jwt || typeof jwt !== "string") {
    console.warn("JWT отсутствует или имеет некорректный формат.");
    return null;
  }

  try {
    return jwtDecode<IAccessTokenPayload>(jwt);
  } catch (error) {
    console.error("Ошибка декодирования JWT:", error);
    return null;
  }
};
