import cn from "classnames";
import { FC } from "react";

import { Button, IButtonProps } from "@/ui";

import styles from "./statistic-block.module.scss";

export interface IStatisticBlockProps {
  counter: number;
  isPercent?: boolean;
  circleColor?: "blue" | "green" | "yellow";
  subtitle: string;
  button?: IButtonProps;
  params?: { title: string; value: string }[];
}

export const StatisticBlock: FC<IStatisticBlockProps> = ({
  counter,
  subtitle,
  isPercent = false,
  circleColor = "blue",
  params,
  button,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.circle, styles[`circle_${circleColor}`])}>
        <span
          className={cn(
            styles.circle_counter,
            styles[`circle_counter_${circleColor}`],
          )}
        >
          {isPercent ? `${counter}%` : counter}
        </span>
        <span
          className={cn(
            styles.circle_subtitle,
            styles[`circle_subtitle_${circleColor}`],
          )}
        >
          {subtitle}
        </span>
      </div>

      <div className={styles.content}>
        {params?.map(({ title, value }) => (
          <div className={styles.content_item} key={title}>
            <span className={styles.content_item_title}>{title}</span>
            <span className={styles.content_item_value}>{value}</span>
          </div>
        ))}
        {!!button && (
          <Button
            className={styles.button}
            fullWidth
            color={"gray"}
            {...button}
          />
        )}
      </div>
    </div>
  );
};
