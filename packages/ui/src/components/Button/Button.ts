import { IButton } from "./Button.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { RippleEffect } from "../RippleEffect/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

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
