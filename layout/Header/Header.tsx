import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Header = ({ ...props }: HeaderProps) => {
  return <div {...props}>Header</div>;
};
