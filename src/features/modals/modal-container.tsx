import {
  ChooseGameTypeModal,
  ChooseSideModal,
  CreateGameModal,
  UnitModal,
} from "@/features";

export const ModalContainer = () => {
  return (
    <>
      <CreateGameModal />
      <UnitModal />
      <ChooseSideModal />
      <ChooseGameTypeModal />
    </>
  );
};
