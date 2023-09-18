import { BaseElement, IBaseElement } from "../BaseElement";

export interface ISection extends IBaseElement {
  variant?: "header" | "footer" | "main" | "aside" | "section" | "article" | "nav" | "div" ;
}

export function Section({ 
  id, 
  variant = "section",
  ...props
}: ISection = {}): HTMLDivElement {
  const section = BaseElement({
    tag: variant,
    ...props
  }) as HTMLDivElement;

  return section;
}
