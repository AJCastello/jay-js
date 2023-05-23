import { BaseElement, IBaseElement } from "..";

export interface IBadge extends IBaseElement {
  variant?: "badge-outline";
  color?: "badge-primary" | "badge-secondary" | "badge-accent" | "badge-ghost" | "badge-info" | "badge-success" | "badge-warning" | "badge-error";
  size?: "badge-lg" | "badge-md" | "badge-sm" | "badge-xs";
};

export function Badge({
  variant,
  color,
  size,
  ...props
}: IBadge) : HTMLSpanElement {

  const classNameData = [
    "badge",
    variant,
    color,
    size,
    props.className || "",
  ].filter(Boolean).join(" ").trim();

  const badgeElement = BaseElement({
    tag: "span",
    className: classNameData,
    ...props,
  }) as HTMLSpanElement;

  return badgeElement;
}
