import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export const getUserUuid = () => {
  const jwt = getCookie("jwt-access");

  if (!jwt || typeof jwt !== "string") {
    console.warn("JWT отсутствует или имеет некорректный формат.");
    return null;
  }

  try {
    return jwtDecode(jwt);
  } catch (error) {
    console.error("Ошибка декодирования JWT:", error);
    return null;
  }
};
