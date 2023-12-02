import { mergeClasses } from "../../utils/mergeClasses.js";
import { Box, IBox } from "../Box/Box.js";

export interface INavbarExt extends IBox {
 // options
}

export type INavbar = INavbarExt & Partial<Omit<HTMLDivElement, "style" | "children">>;

export function Navbar({
  ...props
}: INavbar = {}): HTMLDivElement {
  const className = mergeClasses([
    "navbar",
    props.className,
  ]);

  return Box({
    ...props,
    className
  });
}