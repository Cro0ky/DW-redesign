import { z } from "zod";
import {
  PASSWORD_ALLOWED_CHARS_REGEX,
  PASSWORD_HAS_LATIN_LETTER_REGEX,
  PASSWORD_HAS_SPECIAL_SYMBOL_REGEX,
} from "@/lib/validation/password";

export const useRegistrationSchema = () => {
  const registrationSchema = z
    .object({
      username: z
        .string()
        .trim()
        .nonempty({ message: "auth.write_username" })
        .regex(/^\S+$/, { message: "auth.errors.username_no_spaces" })
        .min(3, { message: "auth.errors.username_min_length" })
        .max(30, { message: "auth.errors.username_max_length" }),
      email: z
        .email({ message: "auth.errors.incorrect_mail_format" })
        .trim()
        .nonempty({ message: "auth.write_email" })
        .refine(
          (value) => {
            const domain = value.toLowerCase().split("@")[1] ?? "";
            return !domain.startsWith("icloud");
          },
          { message: "auth.errors.icloud_domain_not_allowed" },
        )
        .max(100, { message: "errors.max_length" }),
      password: z
        .string()
        .nonempty({ message: "auth.write_password" })
        .min(8, { message: "auth.errors.password_must_be_least_8_characters" })
        .regex(PASSWORD_ALLOWED_CHARS_REGEX, {
          message: "auth.errors.password_invalid_characters",
        })
        .regex(PASSWORD_HAS_LATIN_LETTER_REGEX, {
          message: "auth.errors.password_requirements",
        })
        .regex(PASSWORD_HAS_SPECIAL_SYMBOL_REGEX, {
          message: "auth.errors.password_requirements",
        })
        .max(128, { message: "errors.max_length" }),
      confirm_password: z
        .string()
        .nonempty({ message: "auth.repeat_password" })
        .min(8, { message: "auth.errors.password_must_be_least_8_characters" })
        .regex(PASSWORD_ALLOWED_CHARS_REGEX, {
          message: "auth.errors.password_invalid_characters",
        })
        .regex(PASSWORD_HAS_LATIN_LETTER_REGEX, {
          message: "auth.errors.password_requirements",
        })
        .regex(PASSWORD_HAS_SPECIAL_SYMBOL_REGEX, {
          message: "auth.errors.password_requirements",
        })
        .max(128, { message: "errors.max_length" }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "auth.errors.passwords_dont_match",
      path: ["confirm_password"],
    });

  return { registrationSchema };
};
