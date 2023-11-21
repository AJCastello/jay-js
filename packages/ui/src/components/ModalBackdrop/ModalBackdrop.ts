import { mergeClasses } from "../../utils";
import { IBox } from "../Box";
import { Button } from "../Button";
import { Form } from "../Form";

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