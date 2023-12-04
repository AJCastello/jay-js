import { ISelect } from "./Select.types.js";
import { Typography } from "../Typography/index.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

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
}: ISelect = {}) {
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
        children: label,
      });

      labelElement.append(labelText);

      if (labelAlt) {
        const labelTextAlt = Typography({
          variant: "span",
          className: "label-text-alt",
          children: labelAlt,
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
