import { IBadge } from "./Badge.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Badge({
  variant,
  color,
  size,
  ...props
}: IBadge = {}): HTMLSpanElement {
  const className = mergeClasses([
    "badge",
    variant,
    color,
    size,
    props.className,
  ]);

  return BaseElement<IBadge>({
    tag: "span",
    ...props,
    className
  }) as HTMLSpanElement;
}
