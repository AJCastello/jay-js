import { mergeClasses } from "../../utils";
import { IBaseElement } from "../BaseElement";
import { Box } from "../Box";

export type ICollapseContent = IBaseElement;

export function CollapseContent({
  ...props
}: ICollapseContent = {}): HTMLDivElement {
  const className = mergeClasses([
    "collapse-content",
    props.className
  ]);

  return Box({
    ...props,
    className
  }) 
}