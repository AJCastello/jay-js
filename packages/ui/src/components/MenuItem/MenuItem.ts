import { mergeClasses } from "../../utils/mergeClasses.js";
import { IListItem, ListItem } from "../ListItem/ListItem.js";

export interface IMenuItemExt extends Omit<IListItem, "focus"> {
  disabled?: boolean;
  active?: boolean;
  focus?: boolean;
}

export type IMenuItem = IMenuItemExt &
  Partial<Omit<HTMLUListElement, "style" | "children">>;

export function MenuItem({
  disabled,
  active,
  focus,
  ...props
}: IMenuItem = {}): HTMLUListElement {
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
