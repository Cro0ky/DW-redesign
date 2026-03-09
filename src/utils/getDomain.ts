export const getDomain = () => {
  if (process.env.NODE_ENV === "development") return "localhost";

  return ".dronewars.su";
};
