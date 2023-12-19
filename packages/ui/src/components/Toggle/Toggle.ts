import { Base } from "../Base/Base.js";
import { Input } from "../Input/Input.js";
import { TToggle } from "./Toggle.types.js";
import { Typography } from "../Typography/Typography.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Toggle<T extends TBaseTagMap = "div" | "input">({
  label,
  color,
  size,
  position = "toggle-after",
  formControl,
  ...props
}: TToggle<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "toggle",
    color,
    size,
    props.className,
  ]);

  const toggleElement = Input({
    ...props,
    tag: "input",
    type: "checkbox",
    className,
  }) as HTMLInputElement;

  if (label) {
    const labelElement = Base({
      tag: "label",
      className: "label cursor-pointer justify-start gap-2",
    });

    const labelText = Typography({
      tag: "span",
      className: "label-text",
      children: label,
    });

    labelElement.append(labelText);

    if (position === "toggle-before") {
      labelElement.append(toggleElement);
    } else {
      labelElement.prepend(toggleElement);
    }

    const formControlContainer = Base({
      ...formControl,
      className: mergeClasses(["form-control", formControl?.className]),
      children: labelElement,
    }) as HTMLDivElement;
    
    return formControlContainer as HTMLElementTagNameMap[T];
  }

  return toggleElement as HTMLElementTagNameMap[T];
}
