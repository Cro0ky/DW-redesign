import { z } from "zod";

const FIO_REGEX = /^[A-Za-zА-Яа-яЁё-]+$/;
const PHONE_REGEX = /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
const BIRTH_DATE_REGEX = /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

const isValidBirthDate = (value: string) => {
  if (!BIRTH_DATE_REGEX.test(value)) {
    return false;
  }

  const [dayRaw, monthRaw, yearRaw] = value.split(".");
  const day = Number(dayRaw);
  const month = Number(monthRaw);
  const year = Number(yearRaw);

  const parsedDate = new Date(year, month - 1, day);
  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return false;
  }

  const now = new Date();
  return parsedDate <= now;
};

export const useUserRadioChannelsSchema = () => {
  const userRadioChannelsSchema = z.object({
    last_name: z
      .string()
      .trim()
      .min(1, { message: "all.this_field_cannot_be_empty" })
      .max(50, { message: "form.enter_a_valid_username" })
      .regex(FIO_REGEX, { message: "form.enter_a_valid_username" }),
    first_name: z
      .string()
      .trim()
      .min(1, { message: "all.this_field_cannot_be_empty" })
      .max(50, { message: "form.enter_a_valid_username" })
      .regex(FIO_REGEX, { message: "form.enter_a_valid_username" }),
    middle_name: z
      .string()
      .trim()
      .min(1, { message: "all.this_field_cannot_be_empty" })
      .max(50, { message: "form.enter_a_valid_username" })
      .regex(FIO_REGEX, { message: "form.enter_a_valid_username" }),
    phone_number: z
      .string()
      .trim()
      .min(1, { message: "all.this_field_cannot_be_empty" })
      .regex(PHONE_REGEX, { message: "form.enter_a_valid_username" }),
    birth_date: z
      .string()
      .trim()
      .min(1, { message: "all.this_field_cannot_be_empty" })
      .refine(isValidBirthDate, { message: "form.enter_a_valid_username" }),
    email: z
      .string()
      .trim()
      .min(1, { message: "all.this_field_cannot_be_empty" })
      .email({ message: "form.enter_a_valid_email_address" })
      .max(100, { message: "form.enter_a_valid_email_address" }),
  });

  return { userRadioChannelsSchema };
};
