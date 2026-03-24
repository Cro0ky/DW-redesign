"use client";

import cn from "classnames";
import { ChevronDown } from "lucide-react";
import { FC, useLayoutEffect, useRef, useState } from "react";

import styles from "./accordion.module.scss";

interface IAccordionProps {
  title?: string;
  content?: string;
}

export const Accordion: FC<IAccordionProps> = ({ title, content }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    setHeight(isCollapsed ? 0 : el.scrollHeight);
  }, [isCollapsed, content]);

  return (
    <div className={styles.wrapper}>
      <div
        className={cn(styles.head, {
          [styles.head_opened]: !isCollapsed,
        })}
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <span className={styles.head_title}>{title}</span>
        <ChevronDown
          size={30}
          className={cn(styles.head_icon, {
            [styles.head_icon_active]: !isCollapsed,
          })}
        />
      </div>

      <div
        className={cn(styles.body, { [styles.body_open]: !isCollapsed })}
        style={{ height }}
        aria-hidden={isCollapsed}
      >
        <div ref={innerRef} className={styles.content}>
          {content}
        </div>
      </div>
    </div>
  );
};
