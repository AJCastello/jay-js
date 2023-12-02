import { mergeClasses } from "../../utils/mergeClasses.js";
import { List, IList } from "../List/List.js";

export interface IMenu extends IList {
  size?: "menu-xs" | "menu-sm" | "menu-md" | "menu-lg";
  position?: "menu-vertical" | "menu-horizontal";
}

export function Menu({
  size,
  position,
  ...props
}: IMenu = {}): HTMLUListElement {
  const className = mergeClasses(["menu", size, position, props.className]);

  return List({
    ...props,
    className,
  });
}
