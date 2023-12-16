import { IBadge } from "./Badge.types.js";
import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Badge<T extends TBaseTagMap = "div">({
  variant,
  color,
  size,
  ...props
}: IBadge<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "badge",
    variant,
    color,
    size,
    props.className,
  ]);

  return Base({
    tag: "span",
    ...props,
    className
  }) as HTMLElementTagNameMap[T];
}

  
