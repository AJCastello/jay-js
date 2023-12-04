import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { ICollapse } from "./Collapse.types.js";

export function Collapse({
  details,
  variant,
  forceOpen,
  forceClose,
  ...props
}: ICollapse = {}): HTMLDivElement | HTMLDetailsElement {
  const className = mergeClasses([
    "collapse",
    variant,
    forceOpen ? "collapse-open" : "",
    forceClose ? "collapse-close" : "",    
    props.className
  ]);

  return BaseElement<ICollapse>({
    tag: details ? "details" : "div",
    ...props,
    className
  }) as HTMLDivElement | HTMLDetailsElement 
}