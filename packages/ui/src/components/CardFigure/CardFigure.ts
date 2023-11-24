import { IBaseElement, BaseElement } from "../BaseElement/index.js";

export function CardFigure({ ...props }: IBaseElement): HTMLElement {
  const figureElement = BaseElement({
    ...props,
    tag: "figure"
  });
  return figureElement;
}