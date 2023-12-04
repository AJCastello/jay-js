import { List } from "../List/List.js";
import { IMenu } from "./Menu.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Menu({
  size,
  position,
  ...props
}: IMenu = {}): HTMLUListElement {
  const className = mergeClasses([
    "menu",
    size,
    position,
    props.className
  ]);

  return List({
    ...props,
    className,
  });
}