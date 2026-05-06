export const formatBirthDateMask = (rawValue: string) => {
  const digits = rawValue.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;

  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
};

export const formatPhoneMask = (rawValue: string) => {
  let digits = rawValue.replace(/\D/g, "");

  if (!digits.length) {
    return "";
  }

  if (digits[0] === "8") {
    digits = `7${digits.slice(1)}`;
  }

  if (digits[0] !== "7") {
    digits = `7${digits}`;
  }

  digits = digits.slice(0, 11);

  const country = "+7";
  const part1 = digits.slice(1, 4);
  const part2 = digits.slice(4, 7);
  const part3 = digits.slice(7, 9);
  const part4 = digits.slice(9, 11);

  let masked = country;
  if (part1) masked += `(${part1}`;
  if (part1.length === 3) masked += ")";
  if (part2) masked += `-${part2}`;
  if (part3) masked += `-${part3}`;
  if (part4) masked += `-${part4}`;

  return masked;
};

export const formatBirthDateToApi = (value: string) => {
  const [day, month, year] = value.split(".");

  if (!day || !month || !year || year.length !== 4) {
    return value;
  }

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};
