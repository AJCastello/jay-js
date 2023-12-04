import { Form } from "../Form/index.js";
import { Button } from "../Button/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { IModalBackdrop } from "./ModalBackdrop.types.js";

export function ModalBackdrop({
  ...props
}: IModalBackdrop = {}): HTMLFormElement {
  const className = mergeClasses([
    "modal-backdrop",
    props.className
  ]);

  return Form({
    ...props,
    method: "dialog",
    className,
    children: Button({
      children: "close"
    })
  });
}