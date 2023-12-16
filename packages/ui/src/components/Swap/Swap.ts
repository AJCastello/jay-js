import { TSwap } from "./Swap.types.js";
import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Swap<T extends TBaseTagMap = "label">({
  effect,
  ...props
}: TSwap<T> = { tag: "label" }): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "swap",
    effect,
    props.className
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
