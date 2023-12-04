import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { IBreadcrumbs } from "./Breadcrumbs.types.js";

export function Breadcrumbs({
  ...props
}: IBreadcrumbs = {}): HTMLDivElement {
  const className = mergeClasses([
    "breadcrumbs",
    props.className,
  ]);

  return BaseElement<IBreadcrumbs>({
    ...props,
    className
  }) as HTMLDivElement;
}