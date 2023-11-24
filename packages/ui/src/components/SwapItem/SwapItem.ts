import { IBaseElement } from "../BaseElement/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { Box } from "../Box/index.js";

export interface ISwapItemExt extends IBaseElement {
  state?: "swap-on" | "swap-off";
}

export type ISwapItem = ISwapItemExt & Partial<Omit<HTMLDivElement, "style" | "children">>;

export function SwapItem({
  state,
  ...props
}: ISwapItem): HTMLDivElement {
  const className = mergeClasses([
    state,
    props.className
  ]);

  return Box({
    ...props,
    className
  });
}
