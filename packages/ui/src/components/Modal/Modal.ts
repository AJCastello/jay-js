import { IModal } from "./Modal.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Modal({
  position,
  ...props
}: IModal = {}): HTMLDialogElement {
  const className = mergeClasses([
    "modal",
    props.className
  ]);

  return BaseElement<IModal>({
    ...props,
    tag: "dialog",
    className
  }) as HTMLDialogElement;
}
