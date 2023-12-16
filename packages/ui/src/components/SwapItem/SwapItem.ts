import { Box } from "../Box/index.js";
import { TSwapItem } from "./SwapItem.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function SwapItem<T extends TBaseTagMap = "div">({
  state,
  ...props
}: TSwapItem<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    state,
    props.className
  ]);

  return Box({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
