import {
  ChooseGameTypeModal,
  ChooseSideModal,
  CreateGameModal,
  UnitModal,
  CreateSingleSession,
  WaitingOpponentModal,
} from "@/features";

export const ModalContainer = () => {
  return (
    <>
      <CreateGameModal />
      <UnitModal />
      <ChooseSideModal />
      <ChooseGameTypeModal />
      <CreateSingleSession />
      <WaitingOpponentModal />
    </>
  );
};
