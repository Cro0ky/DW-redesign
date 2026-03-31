import { FC, useEffect, useState } from "react";

import styles from "./timer.module.scss";

interface ITimerProps {
  time?: number;
  isUpdateSearchTimer: boolean;
  onOffUpdateSearchTimer: () => void;
}

export const Timer: FC<ITimerProps> = ({
  time = 10,
  isUpdateSearchTimer,
  onOffUpdateSearchTimer,
}) => {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    if (isUpdateSearchTimer) {
      onOffUpdateSearchTimer();
      setSeconds(time);
    }
  }, [isUpdateSearchTimer, onOffUpdateSearchTimer, time]);

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.timer}>
      <span>{String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")}:</span>
      <span>{String(seconds % 60).padStart(2, "0")}</span>
    </div>
  );
};
