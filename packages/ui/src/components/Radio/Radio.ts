import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TRadio } from "./Radio.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Radio<T extends TBaseTagMap = "input">({
  label,
  color,
  size,
  position = "radio-after",
  formControl,
  ...props
}: TRadio<T> = { tag: "input" }): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "radio",
    color,
    size,
    props.className,
  ]);

  const radioElement = Base({
    ...props,
    className,
    tag: "input",
    type: "radio"
  });

  if (label) {
    const labelElement = Base({
      tag: "label",
      className: "label cursor-pointer justify-start gap-2",
      children: label
    });

    if (position === "radio-before") {
      labelElement.append(radioElement);
    } else {
      labelElement.prepend(radioElement);
    }

    const formControlContainer = Base({
      ...formControl,
      tag: "div",
      className: mergeClasses(["form-control", formControl?.className]),
      children: labelElement,
    });
    return formControlContainer as HTMLElementTagNameMap[T];
  }
  return radioElement as HTMLElementTagNameMap[T];
}