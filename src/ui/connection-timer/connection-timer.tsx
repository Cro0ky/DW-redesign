import { PropsWithChildren } from "react";

import Drone from "@/assets/svg/drone.svg";

import styles from "./connection-timer.module.scss";
import { Stopwatch } from "./stopwatch";
import { Timer } from "./timer";

function ConnectionTimer({ children }: PropsWithChildren) {
  const numIcons = 10; // Количество иконок
  const radius = 70; // Радиус круга
  const axis = 36;

  const drons = Array.from({ length: numIcons });

  return (
    <div className={styles.content_icon}>
      {drons.map((_, index) => {
        const angle = (index / numIcons) * 2 * Math.PI;

        const x = radius * Math.cos(angle) - 14;
        const y = radius * Math.sin(angle);
        const z = axis * index;

        return (
          <Drone
            key={index}
            className={`${styles.icon} ${styles[`icon-${index}`]}`}
            style={{
              transform: `translate(${x}px, ${y + 100}px) rotate(${z}deg)`,
            }}
          />
        );
      })}
      {children}
    </div>
  );
}

ConnectionTimer.Timer = Timer;
ConnectionTimer.Stopwatch = Stopwatch;

export { ConnectionTimer };
