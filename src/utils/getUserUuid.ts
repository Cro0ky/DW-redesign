import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

interface IAccessTokenPayload {
  user_id: string;
}

export const getUserUuid = (): IAccessTokenPayload | null => {
  const jwt = getCookie("jwt-access");

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
