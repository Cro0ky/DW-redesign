import { FC, ReactNode } from "react";

import styles from "./profile-info-block.module.scss";

interface IProfileInfoBlockProps {
  title?: string;
  children?: ReactNode;
}

export const ProfileInfoBlock: FC<IProfileInfoBlockProps> = ({
  title,
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{title}</span>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
