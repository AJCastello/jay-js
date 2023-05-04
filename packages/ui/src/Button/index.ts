import { Icon, BaseElement, RippleEffect, IBaseElement } from "..";

// wide
// "btn-wide"	Responsive	Wide button (more horizontal padding)

export interface IButton extends IBaseElement {
  type?: string;
  className?: string;
  size?: "btn-lg" | "btn-md" | "btn-sm" | "btn-xs";
  format?: "btn-circle" | "btn-square";
  color?: "btn-primary" | "btn-secondary" | "btn-accent" | "btn-info" | "btn-success" | "btn-warning" | "btn-error"
  variant?: "btn-ghost" | "btn-link" | "btn-outline";
  active?: "btn-active" | "btn-disabled";
  content?: string | HTMLElement;
  disabled?: boolean;

  startIcon?: {
    icon: string;
    type?: string;
    className?: string;
  };
  endIcon?: {
    icon: string;
    type?: string;
    className?: string;
  };

  fullWidth?: boolean;

  glass?: boolean;
  loading?: boolean;
  animation?: boolean;

  ripple?: boolean;
}

export function Button({
  type,
  className,
  content,
  disabled,
  startIcon,
  endIcon,

  size,
  format,
  color,
  variant,
  active,

  fullWidth,

  glass,
  loading,
  animation,

  ripple = true,
  ...props
}: IButton): HTMLButtonElement {
  const resetCss = className && className.includes("--r");

  const classNameData = [
    "btn",
    size,
    format,
    color,
    variant,
    active,

    fullWidth ? "btn-block" : "",

    glass,
    loading,
    animation ? "no-animation" : "",

    "relative overflow-hidden",
    className ? className : ""
  ].filter(Boolean).join(" ").trim();

  const objButton = BaseElement({
    tag: "button",
    className: resetCss
      ? className
      : classNameData,
    ...props,
  }) as HTMLButtonElement;

  type && (objButton.type = type);

  disabled && objButton.setAttribute("disabled", "true");

  const buttonContent = [];

  if (loading) {
    buttonContent.push(
      Icon({ icon: "spinner", type: "solid", className: "animate-spin" })
    );
  } else {
    startIcon && buttonContent.push(Icon(startIcon));
    content && buttonContent.push(content);
    endIcon && buttonContent.push(Icon(endIcon));
  }

  objButton.content = buttonContent;

  ripple && objButton.addEventListener("click", (event) => {
    if (!disabled) {
      const ripple = RippleEffect(event);
      objButton.append(ripple);
    }
  });

  return objButton;
}
