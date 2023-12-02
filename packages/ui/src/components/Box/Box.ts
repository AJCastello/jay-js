import { BaseElement, IBaseElement } from "../BaseElement/index.js";

export type IBox = IBaseElement

export function Box({
  ...props
}: IBox = {}) {
  return BaseElement({
    tag: "div",
    ...props
  }) as HTMLDivElement;
}
