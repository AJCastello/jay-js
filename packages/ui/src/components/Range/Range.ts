import { Input } from "../Input/Input.js";
import { TRange } from "./Range.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Range<T extends TBaseTagMap = "input">({
  size,
  color,
  ...props
}: TRange<T> = { tag: "input"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "range",
    size,
    color,
    props.className,
  ]);

  return Input({
    ...props,
    tag: "input",
    type: "range",
    className
  }) as HTMLElementTagNameMap[T];
}
