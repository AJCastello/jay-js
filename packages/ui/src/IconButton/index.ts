import { Button, IButton, RippleEffect } from "..";

export type IIconButton = IButton

export function IconButton({
  ...props
}: IButton & Partial<Omit<HTMLButtonElement, "style">>): HTMLButtonElement {

  const classNames = [
    "cursor-pointer",
    "rounded-full",
    "btn-ghost",
    "p-2",
  ].filter(Boolean).join(" ").trim();

  const iconButton = Button({
    type: "button",
    ...props,
    className: `${classNames} ${props.className ? props.className : ""}`,
  });

  iconButton.addEventListener("click", (event) => {
    const ripple = RippleEffect(event as MouseEvent);
    iconButton.append(ripple);
  });

  return iconButton;
}