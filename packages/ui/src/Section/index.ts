import { BaseElement, IBaseElement } from "../BaseElement";

export type ISection = IBaseElement

export function Section({ 
  id, 
  content,
  ...props
}: ISection = {}): HTMLDivElement {
  const section = BaseElement({
    id,
    tag: "div",
    ...props
  }) as HTMLDivElement;

  content && (section.content = content);
  return section;
}
