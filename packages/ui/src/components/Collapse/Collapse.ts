import { mergeClasses } from "../../utils/mergeClasses.js";
import { IBaseElement } from "../BaseElement/index.js";
import { Box } from "../Box/index.js";

export interface ICollapse extends IBaseElement {
  variant?: "collapse-arrow" | "collapse-plus";
  forceOpen?: boolean;
  forceClose?: boolean;
}

export function Collapse({
  variant,
  forceOpen,
  forceClose,
  ...props
}: ICollapse = {}): HTMLDivElement {
  const className = mergeClasses([
    "collapse",
    variant,
    forceOpen ? "collapse-open" : "",
    forceClose ? "collapse-close" : "",    
    props.className
  ]);

  return Box({
    ...props,
    className
  }) 
}