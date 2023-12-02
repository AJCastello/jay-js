import { mergeClasses } from "../../utils/mergeClasses.js";
import { Box, IBox } from "../Box/Box.js";

export interface INavbarComponentExt extends IBox {
  component?: "navbar-start" | "navbar-center" | "navbar-end";
}

export type INavbarComponent = INavbarComponentExt &
  Partial<Omit<HTMLDivElement, "style" | "children">>;

export function NavbarComponent({
  component = "navbar-start",
  ...props
}: INavbarComponent = {}): HTMLDivElement {
  const className = mergeClasses([component, props.className]);

  return Box({
    ...props,
    className,
  });
}
