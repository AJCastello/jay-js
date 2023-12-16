import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TCardTitle } from "./CardTitle.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function CardTitle<T extends TBaseTagMap = "h1">({
  ...props
}: TCardTitle<T> = { tag: "h1"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "card-title",
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
