import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement, IBaseElement } from "../BaseElement/BaseElement.js";

export interface IKbdExt extends IBaseElement {
  size?: "kbd-lg" | "kbd-md" | "kbd-sm" | "kbd-xs";
}

export type IKbd = IKbdExt & Partial<Omit<HTMLDivElement, "style" | "children">>;

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
