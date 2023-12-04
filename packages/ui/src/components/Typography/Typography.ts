import { BaseElement } from "../BaseElement/BaseElement.js";
import { ITypography } from "./Typography.types.js";

export function Typography({ 
  variant = "p",
  ...props
}: ITypography = {}): HTMLElement {
  return BaseElement({
    tag: variant,
    ...props
  });
}
