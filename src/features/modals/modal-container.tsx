import {
  UnitModal,
  CreateGameModal,
  ChooseSideModal,
  CreateTeamSession,
  ChooseGameTypeModal,
  CreateSingleSession,
  WaitingOpponentModal,
  ConfirmRcApplicationModal,
} from "@/features";

export const ModalContainer = () => {
  return (
    <>
      <ConfirmRcApplicationModal />
      <WaitingOpponentModal />
      <ChooseGameTypeModal />
      <CreateSingleSession />
      <CreateTeamSession />
      <ChooseSideModal />
      <CreateGameModal />
      <UnitModal />
    </>
  );
};
