import { BaseElement, IBaseElement } from "../BaseElement";
import { mergeClasses } from "../../utils/mergeClasses";

export interface IBadgeExt extends IBaseElement {
  variant?: "badge-outline";
  color?: "badge-primary" | "badge-secondary" | "badge-accent" | "badge-ghost" | "badge-info" | "badge-success" | "badge-warning" | "badge-error";
  size?: "badge-lg" | "badge-md" | "badge-sm" | "badge-xs";
}

export type IBadge = IBadgeExt & Partial<Omit<HTMLSpanElement, "style">>;

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

  const badgeElement = BaseElement<IBadge>({
    tag: "span",
    ...props,
    className
  }) as HTMLSpanElement;

  return badgeElement;
}
