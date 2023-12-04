import { IIcon } from "./Icon.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Icon({
  icon,
  type,
  ...props
}: IIcon = {}): HTMLElement {
  const className = mergeClasses([
    type,
    icon,
    props.className,
  ]);

  return BaseElement({
    tag: "i",
    ...props,
    className,
  });
}
