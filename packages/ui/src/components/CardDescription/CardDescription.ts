import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TCardDescription } from "./CardDescription.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function CardDescription<T extends TBaseTagMap = "p">({
  ...props
}: TCardDescription<T> = { tag: "p"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "card-description",
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
