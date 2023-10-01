import { BaseElement, IBaseElement } from "..";

export interface ITypography extends IBaseElement {
  variant?: string;
}

export function Typography({ 
  variant = "p",
  ...props
}: ITypography): HTMLElement {
  const paragraph = BaseElement({
    tag: variant,
    ...props
  });
  
  return paragraph;
}
