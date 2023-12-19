import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TCardFigure } from "./CardFigure.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function CardFigure<T extends TBaseTagMap = "figure">({
  ...props
}: TCardFigure<T> = { tag: "figure"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "card-figure",
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
