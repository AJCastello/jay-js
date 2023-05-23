import { BaseElement, IBaseElement } from "../BaseElement";

export interface ISection extends IBaseElement {
  variant?: "header" | "footer" | "main" | "aside" | "section" | "article" | "nav" | "div" ;
}

export function Section({ 
  id, 
  content,
  variant = "div",
  ...props
}: ISection = {}): HTMLDivElement {
  const section = BaseElement({
    id,
    tag: variant || "div",
    ...props
  }) as HTMLDivElement;

  content && (section.content = content);
  return section;
}
