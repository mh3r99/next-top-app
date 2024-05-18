import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Menu } from "../Menu/Menu";

export interface SidebarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Sidebar = ({ ...props }: SidebarProps) => {
  return (
    <div {...props}>
      <Menu />
    </div>
  );
};
