import { TMenuTitle } from "./MenuTitle.types.js";
import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function MenuTitle<T extends TBaseTagMap = "li">({
  tag = "li",
  ...props
}: TMenuTitle<T> = { tag: "li"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "menu-title",
    props.className
  ]);

  return Base({
    tag,
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
