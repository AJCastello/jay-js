import { TCardActions } from "./CardActions.types.js";
import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function CardActions<T extends TBaseTagMap = "div">({
  ...props
}: TCardActions<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "card-actions",
    props.className
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
