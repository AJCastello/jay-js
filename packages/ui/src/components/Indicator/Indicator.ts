import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { IIndicator } from "./Indicator.types.js";

export function Indicator({
  ...props
}: IIndicator = {}): HTMLDivElement {
  const className = mergeClasses([
    "indicator",
    props.className,
  ]);

  return BaseElement({
    ...props,
    className
  }) as HTMLDivElement;
}