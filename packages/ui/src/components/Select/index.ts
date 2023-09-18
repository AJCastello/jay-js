import { BaseElement, IBaseElement, Typography } from "..";
import { mergeClasses } from "../../utils";

export interface ISelectExt extends IBaseElement {
  bordered?: boolean;
  ghost?: boolean;
  color?: "select-primary" | "select-secondary" | "select-accent" | "select-success" | "select-warning" | "select-info" | "select-error";
  size?: "select-lg" | "select-md" | "select-sm" | "select-xs";
  label?: string;
  labelAlt?: string;
  helpers?: Array<HTMLElement>;
}

export type ISelect = ISelectExt & Partial<Omit<HTMLSelectElement, "style">>;

export function Select({
  bordered,
  ghost,
  size,
  color,
  label,
  labelAlt,
  helpers,
  value,
  ...props
}: ISelect) {
  const className = mergeClasses([
    "select",
    bordered ? "select-bordered" : "",
    ghost ? "select-ghost" : "",
    size,
    color,
    props.className,
  ]);

  const selectElement = BaseElement<ISelect>({
    ...props,
    tag: "select",
    className
  }) as HTMLSelectElement;

  const selectId = selectElement.id;

  if (label || helpers) {
    const formControl = BaseElement({
      className: "form-control"
    });

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
      formControl.append(labelElement);
    }

    formControl.append(selectElement);

    if (helpers) {
      const helperElement = BaseElement({
        tag: "label",
        className: "label",
        dataset: {
          helper: selectId
        }
      });
      helperElement.append(...helpers);
      formControl.append(helperElement);
    }

    return formControl;
  }
  return selectElement;
}
