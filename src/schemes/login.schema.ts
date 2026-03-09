import { z } from "zod";

export const useLoginSchema = () => {
  const loginSchema = z.object({
    email: z
      .email({ message: "Неправильный формат почты" })
      .nonempty({ message: "Введите почту" }),
    password: z
      .string()
      .nonempty({ message: "Введите пароль" })
      .min(8, { message: "Пароль должен быть не менее 8 символов" }),
  });

  return { loginSchema };
};
