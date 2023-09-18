import { BaseElement, IBaseElement } from "..";

export type IInput = IBaseElement & Partial<Omit<HTMLInputElement, "style" | "size" | "label">>

export function Input<T>({ 
  ...props
}: IInput & T): HTMLInputElement {
  const listItem = BaseElement<IInput & T>({
    ...props,
    tag: "input",
  }) as HTMLInputElement;
  
  return listItem;
}
