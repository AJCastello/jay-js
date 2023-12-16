import { TIndicatorItem } from "./IndicatorItem.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function IndicatorItem<T extends TBaseTagMap = "span">({
  horizontal,
  vertical,
  ...props
}: TIndicatorItem<T> = { tag: "span"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "indicator-item",
    horizontal,
    vertical,
    props.className,
  ]);

  return Base({
    ...props,
    tag: "span",
    className
  }) as HTMLElementTagNameMap[T];
}
