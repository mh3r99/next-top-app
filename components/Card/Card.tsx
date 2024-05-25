import { FC, DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";
import cn from "classnames";

interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: "white" | "blue";
  children: ReactNode;
}

export const Card: FC<CardProps> = ({
  color = "white",
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(styles.card, className, {
        [styles.blue]: color == "blue",
      })}
      {...props}
    >
      {children}
    </div>
  );
};
