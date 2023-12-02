import { mergeClasses } from "../../utils/mergeClasses.js";
import { Box, IBox } from "../Box/Box.js";

export interface IBreadcrumbsExt extends IBox {
 // options
}

export type IBreadcrumbs = IBreadcrumbsExt & Partial<Omit<HTMLDivElement, "style" | "children">>;

export function Breadcrumbs({
  ...props
}: IBreadcrumbs = {}): HTMLDivElement {
  const className = mergeClasses([
    "breadcrumbs",
    props.className,
  ]);

  return Box({
    ...props,
    className
  });
}