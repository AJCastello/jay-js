import { BaseElement, IBaseElement } from "../BaseElement/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export interface ISwapExt extends IBaseElement {
  effect?: "swap-rotate" | "swap-flip";
}

export type ISwap = ISwapExt & Partial<Omit<HTMLDivElement, "style" | "children">>;

export function Swap({
  effect,
  ...props
}: ISwap): HTMLLabelElement {
  const className = mergeClasses([
    "swap",
    effect,
    props.className
  ]);
  
  return BaseElement({
    tag: "label",
    ...props,
    className
  }) as HTMLLabelElement;
}
