import { TMenuItem } from "./MenuItem.types.js";
import { ListItem } from "../ListItem/ListItem.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function MenuItem<T extends TBaseTagMap = "li">({
  disabled,
  active,
  focus,
  ...props
}: TMenuItem<T> = { tag: "li"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    disabled ? "disabled" : "",
    active ? "active" : "",
    focus ? "focus" : "",
    props.className,
  ]);

  return ListItem({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
