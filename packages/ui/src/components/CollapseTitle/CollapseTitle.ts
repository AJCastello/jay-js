import { mergeClasses } from "../../utils";
import { IBaseElement } from "../BaseElement";
import { Box } from "../Box";

export type ICollapseTitle = IBaseElement;

export function CollapseTitle({
  ...props
}: ICollapseTitle = {}): HTMLDivElement {
  const className = mergeClasses([
    "collapse-title",
    props.className
  ]);

  return Box({
    ...props,
    className
  }) 
}