import { ListItem } from "../ListItem/ListItem.js";
import { IMenuItem } from "./MenuItem.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function MenuItem({
  disabled,
  active,
  focus,
  ...props
}: IMenuItem = {}): HTMLLIElement {
  const className = mergeClasses([
    disabled ? "disabled" : "",
    active ? "active" : "",
    focus ? "focus" : "",
    props.className,
  ]);

  return ListItem({
    ...props,
    className,
  });
}
