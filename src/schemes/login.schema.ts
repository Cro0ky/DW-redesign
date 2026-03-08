import { z } from "zod";

export const useLoginSchema = () => {
  const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
  });

  return { loginSchema };
};
