import { IIndicatorItem } from "./IndicatorItem.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";

export function IndicatorItem({
  horizontal,
  vertical,
  ...props
}: IIndicatorItem = {}): HTMLSpanElement {
  const className = mergeClasses([
    "indicator-item",
    horizontal,
    vertical,
    props.className,
  ]);

  return BaseElement({
    tag: "span",
    ...props,
    className
  }) as HTMLSpanElement;
}