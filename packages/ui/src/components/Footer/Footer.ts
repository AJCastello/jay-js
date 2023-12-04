import { IFooter } from "./Footer.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";

export function Footer({
  position,
  ...props
}: IFooter = {}): HTMLElement {
  const className = mergeClasses([
    "footer",
    position,
    props.className,
  ]);

  return BaseElement({
    ...props,
    className
  }) as HTMLElement;
}