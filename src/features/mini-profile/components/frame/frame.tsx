import styles from "./frame.module.scss";

const FRAME_BASE = "/images/frames";

interface IFrameProps {
  frame_number: number;
}

export const Frame = ({ frame_number }: IFrameProps) => {
  return (
    <div className={styles.wrapper}>
      <img
        alt={"frame"}
        src={`${FRAME_BASE}/${frame_number}-frame.png`}
        className={styles.frame}
      />
    </div>
  );
};
