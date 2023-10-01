import { Button, IButton } from "..";

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