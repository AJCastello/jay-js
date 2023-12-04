import { Button } from "../Button/index.js";
import { IIconButton } from "./IconButton.types.js";

export function IconButton({
  ...props
}: IIconButton): HTMLButtonElement {
  return Button({
    ...props,
    type: "button",
    format: "btn-circle",
  });;
}