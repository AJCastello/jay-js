import { BaseElement, IBaseElement } from "../BaseElement";

export interface ITypography extends IBaseElement {
  variant?: string;
}

export function Typography({ 
  id, 
  variant = "p",
  ...props
}: ITypography): HTMLElement {
  const paragraph = BaseElement({
    id,
    tag: variant,
    ...props
  });
  
  return paragraph;
}
