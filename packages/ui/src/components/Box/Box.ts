import { IBox } from "./Box.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";

export function Box({
  ...props
}: IBox = {}) {
  return BaseElement<IBox>({
    ...props
  }) as HTMLDivElement;
}
