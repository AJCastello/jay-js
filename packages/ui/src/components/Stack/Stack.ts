import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { IStack } from "./Stack.types.js";

export function Stack({
  ...props
}: IStack = {}): HTMLDivElement {
  const className = mergeClasses([
    "stack",
    props.className,
  ]);

  return BaseElement({
    ...props,
    className
  }) as HTMLDivElement;
}