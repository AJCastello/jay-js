import { mergeClasses } from "../../utils";
import { IBaseElement } from "../BaseElement";
import { Box } from "../Box";

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