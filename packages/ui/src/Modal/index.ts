import { BaseElement, IBaseElement, IBox, ITypography, Box, Typography, uniKey, Fragment } from "..";

export interface IModal extends IBaseElement {
  id?: string;
  className?: string;
  label: Partial<ITypography>;
  modal: Partial<IBox>;
}

export function Modal({
  id,
  className,
  label,
  modal
}: IModal) {

  if (!id) {
    id = uniKey();
  }

  const modalInstance = document.querySelector(`.modal-box[data-instance="${id}"]`);

  if (!modalInstance) {
    const classNameData = [
      "modal-box",
      className || "",
    ].filter(Boolean).join(" ").trim();

    const modalElement = Box({
      className: "modal",
      dataset: {
        instance: id,
      },
      content: Box({ ...modal, className: classNameData }),
    });

    const checkboxElement = BaseElement({
      id,
      tag: "input",
      type: "checkbox",

      className: "modal-toggle",
    });

    document.body.append(Fragment({
      content: [
        checkboxElement,
        modalElement
      ]
    }));
  } else {
    const child = modalInstance.querySelector("div");
    
    child && (child.className = modal.className || "");
    if (child && modal.content) {
      child.content = modal.content;
    }
  }

  const labelElement = Typography({
    ...label,
    variant: "label",    
    className: `btn ${label.className || ""}`,
  });

  labelElement.setAttribute("for", id);

  return labelElement;
}
