import { BaseElement, IBaseElement, IBox, Box, Form, Button } from "..";
import { mergeClasses } from "../../utils";

export type IModal = IBaseElement & Partial<Omit<HTMLDialogElement, "style">>;

export function ModalBox({ ...props }: IBox): HTMLDivElement {
  const className = mergeClasses(["modal-box", props.className]);
  const modalContent = Box({
    ...props,
    className
  });
  return modalContent;
}

export function ModalAction({ ...props }: IBox): HTMLDivElement {
  const className = mergeClasses(["modal-action", props.className]);
  const modalContent = Box({
    ...props,
    className
  });
  return modalContent;
}

export function ModalBackdrop({ ...props }: IBox): HTMLFormElement {
  const className = mergeClasses(["modal-backdrop", props.className]);
  const modalBackdrop = Form({
    ...props,
    method: "dialog",
    className,
    content: Button({
      content: "close"
    })
  });
  return modalBackdrop;
}

export function Modal({
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
