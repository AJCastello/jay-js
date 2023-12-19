import { TIndicator } from "./Indicator.types.js";
import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Indicator<T extends TBaseTagMap = "div">({
  ...props
}: TIndicator<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "indicator",
    props.className,
  ]);

  return Base({
    ...props,
    className
  }) as HTMLElementTagNameMap[T];
}
