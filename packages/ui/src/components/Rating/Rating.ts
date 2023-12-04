import { IRating } from "./Rating.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";

export function Rating({
  size,
  half,
  hidden,
  ...props
}: IRating = {}): HTMLDivElement {
  const className = mergeClasses([
    "rating",
    size,
    half ? "rating-half" : "",
    hidden ? "rating-hidden" : "",
    props.className,
  ]);

  return BaseElement({
    ...props,
    className
  }) as HTMLDivElement;
}