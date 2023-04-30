import { Icon, BaseElement, RippleEffect, IBaseElement, useListener } from "..";

export interface IButton extends IBaseElement {
  type?: string;
  className?: string;
  variant?: string;
  color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | "outline"
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
  loading?: boolean;
  size?: "lg" | "md" | "sm" | "xs";
  format?: "circle" | "square";
  fullWidth?: boolean;
}

export function Button({
  type,
  className,
  variant,
  color,
  content,
  disabled,
  startIcon,
  endIcon,
  loading,
  size,
  format,
  fullWidth,
  ...props
}: IButton): HTMLButtonElement {
  const resetCss = className && className.includes("--r");

  const classNameData = [
    "btn",
    size ? `btn-${size}` : "",
    format ? `btn-${format}` : "",
    color ? `btn-${color}` : "",
    fullWidth ? "btn-block" : "",
    variant ? `btn-${variant}` : "",
    "relative overflow-hidden",
    className ? className : "",
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

  objButton.addEventListener("click", (event) => {
    if (!disabled) {
      const ripple = RippleEffect(event);
      objButton.append(ripple);
      props.listeners && useListener("click", props.listeners);
      props.onclick?.bind(objButton)(event);
    }
  });

  return objButton;
}
