import { Button, IButton } from "../Button/index.js";

export type IIconButton = IButton;

export function IconButton({
  ...props
}: IIconButton): HTMLButtonElement {
  const iconButton = Button({
    ...props,
    type: "button",
    format: "btn-circle",
  });

  return iconButton;
}