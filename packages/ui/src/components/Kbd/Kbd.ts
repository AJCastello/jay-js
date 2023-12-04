import { IKbd } from "./Kbd.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Kbd({
  size,
  ...props
}: IKbd = {}): HTMLElement {
  const className = mergeClasses([
    "kbd",
    size,
    props.className,
  ]);

  return BaseElement({
    tag: "kbd",
    ...props,
    className
  });
}
