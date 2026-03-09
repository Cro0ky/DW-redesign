import { z } from "zod";

export const useRegistrationSchema = () => {
  const registrationSchema = z
    .object({
      username: z.string().nonempty({ message: "Введите логин" }),
      email: z
        .email({ message: "Неправильный формат почты" })
        .nonempty({ message: "Введите почту" }),
      password: z
        .string()
        .nonempty({ message: "Введите пароль" })
        .min(8, { message: "Пароль должен быть не менее 8 символов" }),
      confirm_password: z
        .string()
        .nonempty({ message: "Подтвердите пароль" })
        .min(8, { message: "Пароль должен быть не менее 8 символов" }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Пароли не совпадают",
      path: ["confirm_password"],
    });

  return { registrationSchema };
};
