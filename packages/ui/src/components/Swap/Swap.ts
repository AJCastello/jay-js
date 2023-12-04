import { ISwap } from "./Swap.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Swap({
  effect,
  ...props
}: ISwap = {}): HTMLLabelElement {
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
