import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import styles from "./Paragraph.module.css";
import cn from "classnames";

interface ParagraphProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  size?: "s" | "m" | "l";
  children: ReactNode;
}
export const Paragraph = ({
  size = "m",
  children,
  className,
  ...props
}: ParagraphProps) => {
  return (
    <p
      className={cn(styles.paragraph, className, {
        [styles.s]: size == "s",
        [styles.m]: size == "m",
        [styles.l]: size == "l",
      })}
      {...props}
    >
      {children}
    </p>
  );
};
