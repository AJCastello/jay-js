import { BaseElement, IBaseElement } from "../BaseElement/index.js";

export interface ISection extends IBaseElement {
  variant?: "header" | "footer" | "main" | "aside" | "section" | "article" | "nav" | "div" ;
}

export function Section({
  variant = "section",
  ...props
}: ISection = {}): HTMLDivElement {
  const section = BaseElement({
    tag: variant,
    ...props
  }) as HTMLDivElement;

  return section;
}
