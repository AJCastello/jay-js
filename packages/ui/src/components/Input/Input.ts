import { BaseElement } from "../BaseElement/BaseElement.js";
import { IInput } from "./Input.types.js";

export function Input<T>({
  ...props
}: IInput & T): HTMLInputElement {
  return BaseElement<IInput & T>({
    ...props,
    tag: "input",
  }) as HTMLInputElement;
}
