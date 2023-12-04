import { ISpace } from "./Space.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";

export function Space({ 
  height = "1rem", 
  ...props 
}: ISpace = {}): HTMLElement {
  return BaseElement({
    style: {
      height: height,
    },
    ...props
  });
}