import { BaseElement, IBaseElement } from "../BaseElement/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export interface IBadgeExt extends IBaseElement {
  variant?: "badge-outline";
  color?: "badge-primary" | "badge-secondary" | "badge-accent" | "badge-ghost" | "badge-info" | "badge-success" | "badge-warning" | "badge-error";
  size?: "badge-lg" | "badge-md" | "badge-sm" | "badge-xs";
}

export type IBadge = IBadgeExt & Partial<Omit<HTMLSpanElement, "style" | "children">>;

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
