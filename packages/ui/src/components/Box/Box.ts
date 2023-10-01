import { BaseElement, IBaseElement } from "..";

export type IBox = IBaseElement

export function Box({
  ...props
}: IBox = {}) {
  const box = BaseElement({
    tag: "div",
    ...props
  }) as HTMLDivElement;

  return box;
}
