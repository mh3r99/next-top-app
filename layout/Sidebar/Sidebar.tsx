import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Menu } from "../Menu/Menu";
import Logo from "../logo.svg";
import styles from "./Sidebar.module.css";
import cn from "classnames";
import { Search } from "../../components";

export interface SidebarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo className={styles.logo} />
      <Search/>
      <Menu />
    </div>
  );
};
