import { mergeClasses } from "../../utils/mergeClasses.js";
import { Box } from "../Box/index.js";
import { ISwapItem } from "./SwapItem.types.js";

export function SwapItem({
  state,
  ...props
}: ISwapItem = {}): HTMLDivElement {
  const className = mergeClasses([
    state,
    props.className
  ]);

  return Box({
    ...props,
    className
  });
}
