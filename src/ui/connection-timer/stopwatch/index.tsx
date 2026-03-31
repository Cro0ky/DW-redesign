import { FC, useEffect, useState } from "react";

import styles from "./stopwatch.module.scss";

export const Stopwatch: FC = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
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
