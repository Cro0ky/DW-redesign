import { IGameType } from "@/types/types";

export const getSimulationUrl = (game_type?: IGameType, chapter?: number) => {
  if (!game_type) return;

  if (
    [
      IGameType.RT_SOLO,
      IGameType.RT_SINGLE,
      IGameType.TEAM,
      IGameType.TUTORIAL,
    ].includes(game_type) &&
    chapter !== 10
  ) {
    return process.env.NEXT_PUBLIC_RT_SIMULATION_URL;
  } else {
    return process.env.NEXT_PUBLIC_SIMULATION_URL;
  }
};
