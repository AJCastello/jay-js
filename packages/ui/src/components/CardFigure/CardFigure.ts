import { BaseElement } from "../BaseElement/BaseElement.js";
import { ICardFigure } from "./CardFigure.types.js";

export function CardFigure({ ...props }: ICardFigure): HTMLElement {
  return BaseElement({
    ...props,
    tag: "figure"
  });
}