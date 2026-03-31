import { z } from "zod";

export const useRegistrationSchema = () => {
  const registrationSchema = z
    .object({
      username: z
        .string()
        .nonempty({ message: "auth.write_username" })
        .max(16, { message: "errors.max_length" }),
      email: z
        .email({ message: "auth.errors.incorrect_mail_format" })
        .nonempty({ message: "auth.write_email" })
        .max(254, { message: "errors.max_length" }),
      password: z
        .string()
        .nonempty({ message: "auth.write_password" })
        .min(8, { message: "auth.errors.password_must_be_least_8_characters" })
        .max(64, { message: "errors.max_length" }),
      confirm_password: z
        .string()
        .nonempty({ message: "auth.repeat_password" })
        .min(8, { message: "auth.errors.password_must_be_least_8_characters" })
        .max(64, { message: "errors.max_length" }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "auth.errors.passwords_dont_match",
      path: ["confirm_password"],
    });

  return { registrationSchema };
};
