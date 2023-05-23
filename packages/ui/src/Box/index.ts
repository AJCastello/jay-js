import { BaseElement, IBaseElement } from "../BaseElement";

export type IBox = IBaseElement

export function Box({ 
  id, 
  content,
  ...props
}: IBox = {}): HTMLDivElement {
  const box = BaseElement({
    id,
    tag: "div",
    ...props
  }) as HTMLDivElement;

  content && (box.content = content);
  return box;
}
