import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TBox } from "./Box.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Box<T extends TBaseTagMap = "div">({
  ...props
}: TBox<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
