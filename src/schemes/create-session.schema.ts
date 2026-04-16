import { GameSide, IGameType } from "@/types/types";
import { z } from "zod";

export const useCreateSessionSchema = () => {
  const createSessionSchema = z.object({
    tick_time: z
      .number()
      .min(30, { message: "Минимальное значение 30" })
      .max(600, { message: "Максимальное значение 600" }),
    inactivity_limit: z.number().max(8, { message: "Максимальное значение 8" }),
    name: z.string().trim().max(100, { message: "errors.max_length" }),
    game_side: z.enum(GameSide),
    game_type: z.enum(IGameType),
    arrangement_turn_duration: z.number(),
    destribution_turn_duration: z.number(),
    sub_turn_duration: z.number(),
    turns_count: z
      .number()
      .min(1, { message: "Минимальное значение 1" })
      .max(10, { message: "Максимальное значение 10" }),

    raas_enabled: z.boolean(),
    enable_weather: z.boolean(),
    day_count: z
      .number()
      .min(1, { message: "Минимальное значение 1" })
      .max(5, { message: "Максимальное значение 5" }),
    preparation_turn_duration: z.number(),
  });

  return { createSessionSchema };
};
