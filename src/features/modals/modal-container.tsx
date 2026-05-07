import {
  UnitModal,
  CreateGameModal,
  ChooseSideModal,
  CreateTeamSession,
  ChooseGameTypeModal,
  CreateSingleSession,
  WaitingOpponentModal,
  GameCodeConnectModal,
  ConfirmRcApplicationModal,
} from "@/features";

export const ModalContainer = () => {
  return (
    <>
      <ConfirmRcApplicationModal />
      <WaitingOpponentModal />
      <GameCodeConnectModal />
      <ChooseGameTypeModal />
      <CreateSingleSession />
      <CreateTeamSession />
      <ChooseSideModal />
      <CreateGameModal />
      <UnitModal />
    </>
  );
};
