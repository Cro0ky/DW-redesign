import { userService } from "@/lib/api/services/user/user.service";
import { useUserStore } from "@/store";
import { ETutorialType, GameSide, IGameType } from "@/types/types";
import { getSimulationUrl } from "@/utils/getSimulationUrl";

import { CHAPTERS } from "./tutorial-chapter.const";

export type TChapterStatus = "completed" | "in_progress" | "closed";

export const useTutorialChapter = () => {
  const { rt_tutorial_unit, id, username } = useUserStore();

  const { createTutorialPractice } = userService;
  const availableChapter = Number(rt_tutorial_unit.split("_")[1]);

  const getChapter = (chapter_id: number) => {
    return CHAPTERS[chapter_id - 1];
  };

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
      const res = await createTutorialPractice({
        chapter: `CHAPTER_${chapter}_PRACTICE`,
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
    getChapter,
    getChapterStatus,
    redirectToChapter,
  };
};
