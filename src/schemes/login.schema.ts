import { z } from "zod";

export const useLoginSchema = () => {
  const loginSchema = z.object({
    email: z
      .email({ message: "auth.errors.incorrect_mail_format" })
      .nonempty({ message: "auth.write_email" })
      .max(254),
    password: z
      .string()
      .nonempty({ message: "auth.write_password" })
      .min(8, { message: "auth.errors.password_must_be_least_8_characters" })
      .max(64, { message: "errors.max_length" }),
  });

  return { loginSchema };
};
