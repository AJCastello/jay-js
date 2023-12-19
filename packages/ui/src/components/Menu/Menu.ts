import { TMenu } from "./Menu.types.js";
import { List } from "../List/List.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Menu<T extends TBaseTagMap = "ul">({
  size,
  position,
  ...props
}: TMenu<T> = { tag: "ul"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "menu",
    size,
    position,
    props.className
  ]);

  return List({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
