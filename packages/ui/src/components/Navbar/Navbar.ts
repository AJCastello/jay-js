import { INavbar } from "./Navbar.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Navbar({
  ...props
}: INavbar = {}): HTMLDivElement {
  const className = mergeClasses([
    "navbar",
    props.className,
  ]);

  return BaseElement({
    ...props,
    className
  }) as HTMLDivElement;
}