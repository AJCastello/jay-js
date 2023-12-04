import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { IMenuTitle } from "./MenuTitle.types.js";

export function MenuTitle({
  tag = "li",
  ...props
}: IMenuTitle = {}): HTMLElement {
  const className = mergeClasses([
    "menu-title",
    props.className
  ]);

  return BaseElement({
    tag,
    ...props,
    className,
  });
}
