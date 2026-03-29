"use client";

import { useMutation } from "@tanstack/react-query";

import { userService } from "@/lib/api/services/user/user.service";
import { useUserStore } from "@/store";
import { ETutorialType, GameSide, IGameType } from "@/types/types";
import { getSimulationUrl } from "@/utils/getSimulationUrl";

export type TChapterStatus = "completed" | "in_progress" | "closed";

export const useTutorialChapter = () => {
  const { rt_tutorial_unit, id, username } = useUserStore();

  const createPractice = useMutation({
    mutationFn: userService.createTutorialPractice,
  });

  const availableChapter = Number(rt_tutorial_unit.split("_")[1]);
  const availableChapterType = rt_tutorial_unit.split("_")[2] as ETutorialType;

  const getChapterStatus = (
    availableChapter: number,
    tutorialId: number,
  ): TChapterStatus => {
    if (availableChapter === 10 && tutorialId === 10) {
      return "in_progress";
    }

    if (availableChapter === tutorialId) return "in_progress";
    if (availableChapter <= tutorialId) return "closed";

    return "completed";
  };

  const redirectToChapter = async (chapter: number, variant: ETutorialType) => {
    if (variant === ETutorialType.PRACTICE && id && username) {
      const res = await createPractice.mutateAsync({
        chapter: `CHAPTER_${chapter}_${ETutorialType.PRACTICE.toUpperCase()}`,
        player: {
          uid: id,
          name: username,
          side: GameSide.RUSSIA,
        },
      });

      if (res) {
        window.location.href = `${getSimulationUrl(IGameType.TUTORIAL, chapter)}/tutorial/${variant}/${chapter}?gameId=${res.game_id}&userId=${id}&gameType=${IGameType.TUTORIAL}`;
      }
      return;
    }
    window.location.href = `${getSimulationUrl(IGameType.TUTORIAL, chapter)}/tutorial/${variant}/${chapter}?userId=${id}`;
  };

  return {
    rt_tutorial_unit,
    availableChapter,
    availableChapterType,
    getChapterStatus,
    redirectToChapter,
  };
};
