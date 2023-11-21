import { mergeClasses } from "../../utils/mergeClasses.js";
import { IBox } from "../Box/index.js";
import { Button } from "../Button/index.js";
import { Form } from "../Form/index.js";

export function ModalBackdrop({ 
  ...props
 }: IBox): HTMLFormElement {
  const className = mergeClasses(["modal-backdrop", props.className]);

  const modalBackdrop = Form({
    ...props,
    method: "dialog",
    className,
    children: Button({
      children: "close"
    })
  });
  return modalBackdrop;
}