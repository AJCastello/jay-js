import { IBaseElement, BaseElement } from "../BaseElement/index.js";

export function CardFigure({ ...props }: IBaseElement): HTMLElement {
  return BaseElement({
    ...props,
    tag: "figure"
  });
}