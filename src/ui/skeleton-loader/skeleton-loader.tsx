"use client";

import cn from "classnames";
import { FC } from "react";

import styles from "./skeleton-loader.module.scss";

interface ISkeletonLoaderProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export const SkeletonLoader: FC<ISkeletonLoaderProps> = ({
  className,
  width,
  height,
  borderRadius,
}) => {
  return (
    <div
      className={cn(styles.skeleton, className, {})}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};
