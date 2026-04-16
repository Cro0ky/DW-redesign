import { useMutation, useQuery } from "@tanstack/react-query";
import { sessionService } from "@/lib/api/services/session/session.service";
import { getSimulationUrl } from "@/utils/getSimulationUrl";
import { EModalName } from "@/ui";
import { useModalStore } from "@/store/modal/modal.store";
import { useUserStore } from "@/store";

const POLL_MS = 2000;

type PollResult =
  | { phase: "waiting" }
  | { phase: "redirected" }
  | { phase: "stop"; status: number };

export const useWaitingOpponentModal = () => {
  const { activeModal, closeModal } = useModalStore();
  const { id } = useUserStore();

  const isWaitingModal =
    activeModal?.name === EModalName.WAITING_OPPONENT_MODAL;

  const game_id = isWaitingModal ? activeModal.props?.game_id : undefined;
  const game_type = isWaitingModal ? activeModal.props?.game_type : undefined;

  const pollingEnabled = Boolean(isWaitingModal && game_id && id && game_type);

  useQuery({
    queryKey: ["opponent-session-status", game_id] as const,
    queryFn: async (): Promise<PollResult> => {
      if (!game_id) return { phase: "stop", status: 0 };

      const { status, data } =
        await sessionService.getOpponentStatusSession(game_id);

      if (status === 201 && data?.url) {
        window.location.href = `${getSimulationUrl(game_type)}/init/${data.url}/${id}`;
        return { phase: "redirected" };
      }

      if (status === 200) {
        return { phase: "waiting" };
      }

      return { phase: "stop", status };
    },
    enabled: pollingEnabled,
    refetchInterval: (query) => {
      if (query.state.data?.phase === "redirected") return false;
      if (query.state.data?.phase === "stop") return false;
      return POLL_MS;
    },
  });

  const deleteSessionMutation = useMutation({
    mutationFn: () => {
      if (!game_id) {
        return Promise.reject(new Error("game_id is missing"));
      }
      return sessionService.deleteSession(game_id);
    },
    onSuccess: () => closeModal(EModalName.WAITING_OPPONENT_MODAL),
  });

  const handleClose = () => {
    deleteSessionMutation.mutate();
  };

  return { handleClose, game_id, game_type, isWaitingModal };
};
