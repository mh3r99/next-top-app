import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import styles from "./Tag.module.css";
import cn from "classnames";

interface TagProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  size?: "s" | "m";
  color?: "ghost" | "red" | "grey" | "green" | "primary";
  href?: string;
}

export const Tag = ({
  size = "s",
  children,
  color = "ghost",
  href,
  className,
  ...props
}: TagProps) => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.s]: size == "s",
        [styles.m]: size == "m",
        [styles.ghost]: color == "ghost",
        [styles.red]: color == "red",
        [styles.grey]: color == "grey",
        [styles.green]: color == "green",
        [styles.primary]: color == "primary",
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};
