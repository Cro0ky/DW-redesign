export const formatDateTime = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("ru-RU", options) === "01.01.1970, 03:00"
      ? ""
      : date.toLocaleString("ru-RU", options);
  } catch {
    console.error("Invalid ISO string:", isoString);
    return "";
  }
};
