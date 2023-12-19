import { TKbd } from "./Kbd.types.js";
import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Kbd<T extends TBaseTagMap = "kbd">({
  size,
  ...props
}: TKbd<T> = { tag: "kbd"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "kbd",
    size,
    props.className,
  ]);

  return Base({
    tag: "kbd",
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
