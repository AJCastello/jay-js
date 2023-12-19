import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TCheckbox } from "./Checkbox.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Checkbox<T extends TBaseTagMap = "input">({
  label,
  color,
  size,
  position = "checkbox-after",
  formControl,
  ...props
}: TCheckbox<T> = { tag: "input" }): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "checkbox",
    color,
    size,
    props.className,
  ]);

  const checkboxElement = Base({
    ...props,
    className,
    tag: "input",
    type: "checkbox"
  });

  if (label) {
    const labelElement = Base({
      tag: "label",
      className: "label cursor-pointer justify-start gap-2",
      children: label
    });

    if (position === "checkbox-before") {
      labelElement.append(checkboxElement);
    } else {
      labelElement.prepend(checkboxElement);
    }

    const formControlContainer = Base({
      ...formControl,
      tag: "div",
      className: mergeClasses(["form-control", formControl?.className]),
      children: labelElement,
    });
    return formControlContainer as HTMLElementTagNameMap[T];
  }
  return checkboxElement as HTMLElementTagNameMap[T];
}
