"use client";

import { useTranslations } from "next-intl";

import { useModalStore } from "@/store/modal/modal.store";
import { EModalName, Modal } from "@/ui";

import styles from "./unit-modal.module.scss";

export const UnitModal = () => {
  const { closeModal, activeModal } = useModalStore();

  const t = useTranslations();

  const props =
    activeModal?.name === EModalName.UNIT_MODAL ? activeModal.props : undefined;

  const { description, topic, data, category, peculiarities } = props ?? {};
  return (
    <Modal
      name={EModalName.UNIT_MODAL}
      onClose={() => closeModal(EModalName.UNIT_MODAL)}
      size={"xl"}
    >
      <div className={styles.wrapper}>
        <div className={styles.info}>
          {topic && (
            <div className={styles.head}>
              <span className={styles.head_title}>{t(`faq.${topic}`)}</span>
              <span className={styles.head_subtitle}>
                {t(`knowledge_base.${category}`)}
              </span>
            </div>
          )}
          {description && (
            <div>
              <span className={styles.title}>Описание</span>
              <div className={styles.description}>
                {t(`faq.${description}`, { ...data })}
              </div>
            </div>
          )}

          {!!peculiarities?.length && (
            <div className={styles.peculiarities}>
              <span className={styles.title}>Особенности</span>
              <div>peculiarities list</div>
            </div>
          )}
        </div>

        <div className={styles.unit}>ASD</div>
      </div>
    </Modal>
  );
};
