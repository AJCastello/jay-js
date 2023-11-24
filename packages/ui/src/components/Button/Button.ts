import { BaseElement, IBaseElement } from "../BaseElement/index.js";
import { RippleEffect } from "../RippleEffect/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export interface IButtonExt extends IBaseElement {
  type?: "button" | "submit" | "reset";
  size?: "btn-lg" | "btn-md" | "btn-sm" | "btn-xs";
  format?: "btn-circle" | "btn-square";
  color?: "btn-primary" | "btn-secondary" | "btn-accent" | "btn-info" | "btn-success" | "btn-warning" | "btn-error";
  variant?: "btn-ghost" | "btn-link" | "btn-outline";
  active?: "btn-active" | "btn-disabled";
  glass?: boolean;
  ripple?: boolean;
  fullWidth?: boolean;
  animation?: boolean;
}

export type IButton = IButtonExt & Partial<Omit<HTMLButtonElement, "style" | "children">>;

export function Button({
  type = "button",
  size,
  format,
  color,
  variant,
  active,
  fullWidth,
  glass,
  animation,
  ripple = true,
  ...props
}: IButton = {}): HTMLButtonElement {
  const className = mergeClasses([
    "btn",
    size,
    format,
    color,
    variant,
    active,
    fullWidth ? "btn-block" : "",
    glass ? "glass" : "",
    animation ? "no-animation" : "",
    ripple ? "relative overflow-hidden" : "",
    props.className,
  ]);

  const objButton = BaseElement<IButton>({
    ...props,
    type,
    tag: "button",
    className,
  }) as HTMLButtonElement;

  ripple && objButton.addEventListener("click", (event) => {
    const ripple = RippleEffect(event);
    objButton.append(ripple);
  });

  return objButton;
}
