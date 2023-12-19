import { TSelect } from "./Select.types.js";
import { Typography } from "../Typography/index.js";
import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Select<T extends TBaseTagMap = "select">({
  bordered,
  ghost,
  size,
  color,
  label,
  labelAlt,
  helpers,
  ...props
}: TSelect<T> = { tag: "select"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "select",
    bordered ? "select-bordered" : "",
    ghost ? "select-ghost" : "",
    size,
    color,
    props.className,
  ]);

  const selectElement = Base({
    ...props,
    tag: "select",
    className
  }) as HTMLSelectElement;

  const selectId = selectElement.id;

  if (label || helpers) {
    const formControl = Base({
      className: "form-control"
    });

    if (label) {
      const labelElement = Base({
        tag: "label",
        className: "label",
      });

      const labelText = Typography({
        tag: "span",
        className: "label-text",
        children: label,
      });

      labelElement.append(labelText);

      if (labelAlt) {
        const labelTextAlt = Typography({
          tag: "span",
          className: "label-text-alt",
          children: labelAlt,
        });
        labelElement.append(labelTextAlt);
      }
      formControl.append(labelElement);
    }

    formControl.append(selectElement);

    if (helpers) {
      const helperElement = Base({
        tag: "label",
        className: "label",
        dataset: {
          helper: selectId
        }
      });
      helperElement.append(...helpers);
      formControl.append(helperElement);
    }

    return formControl as HTMLElementTagNameMap[T];
  }
  return selectElement as HTMLElementTagNameMap[T];
}
