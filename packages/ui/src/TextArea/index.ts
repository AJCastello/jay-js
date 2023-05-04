import { BaseElement, IBaseElement, Section, Typography } from "..";

import IMask from "imask";

import "./TextArea.style.css";

type Helper = {
  className?: string;
  label: string;
};

export interface ITextarea extends IBaseElement {
  id?: string;
  value?: string;
  label?: string;
  labelAlt?: string;
  helpers?: Array<Helper>;
  className?: string;
  placeholder?: string;
  bordered?: boolean;
  ghost?: boolean;
  color?: "textarea-primary" |  "textarea-secondary" |  "textarea-accent" |  "textarea-success" |  "textarea-warning" |  "textarea-info" |  "textarea-error" ;
  size?: "textarea-lg" | "textarea-md" | "textarea-sm" | "textarea-xs";
  mask?: IMask.Masked<any>;
}

export function TextArea({
  value,
  label,
  labelAlt,
  helpers,
  className,
  placeholder,
  bordered,
  ghost,
  color,
  size,
  mask,
  ...props
}: ITextarea) {

  const classNames = [
    "textarea",
    bordered ? "textarea-bordered" : "",
    ghost ? "textarea-ghost" : "",
    color,
    size,
    className || "",
    "textarea-placeholder",
  ].filter(Boolean).join(" ").trim();

  const textareaElement = BaseElement({
    tag: "textarea",
    className: classNames,
    ...props,
  }) as HTMLTextAreaElement;

  if (value) {
    textareaElement.value = value;
  }

  textareaElement.setAttribute("placeholder", " ");

  if (mask) {
    IMask(textareaElement as HTMLTextAreaElement, mask);
  }

  const formControlContent = [];

  if (label) {
    const labelElement = BaseElement({
      tag: "label",
      className: "label",
    });

    const labelText = Typography({
      variant: "span",
      className: "label-text",
      content: label,
    });

    labelElement.append(labelText);

    if (labelAlt) {
      const labelTextAlt = Typography({
        variant: "span",
        className: "label-text-alt",
        content: labelAlt,
      });
      labelElement.append(labelTextAlt);
    }
    formControlContent.push(labelElement);
  }

  if (placeholder) {
    const placeholderElement = Typography({
      variant: "label",
      className: "textarea-placeholder-label bg-base-100 rounded px-2",
      content: placeholder,
    });

    formControlContent.push(
      Section({
        className: "relative w-full flex flex-col",
        content: [textareaElement, placeholderElement],
      })
    );
  } else {
    formControlContent.push(textareaElement);
  }

  if (helpers) {
    const helperElement = BaseElement({
      tag: "label",
      className: "label",
    });
    helpers.forEach((helper) => {
      const helperText = Typography({
        variant: "span",
        className: `label-text-alt ${helper.className || ""}`,
        content: helper.label,
      });

      helperElement.append(helperText);
    });
    formControlContent.push(helperElement);
  }

  const formControl = Section({
    className: "form-control relative",
    content: formControlContent,
  });

  return formControl;
}
