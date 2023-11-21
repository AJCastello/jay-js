import { BaseElement, IBaseElement } from "..";
import { mergeClasses } from "../../utils";

export interface IModalExt extends IBaseElement {
  position?: "modal-top" | "modal-bottom" | "modal-middle";
}

export type IModal = IModalExt & Partial<Omit<HTMLDialogElement, "style" | "children">>;

export function Modal({
  position,
  ...props
}: IModal): HTMLDialogElement {
  const className = mergeClasses(["modal", props.className]);
  const modal = BaseElement({
    ...props,
    tag: "dialog",
    className
  }) as HTMLDialogElement;

  return modal;
}
