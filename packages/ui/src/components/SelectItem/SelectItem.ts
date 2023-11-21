import { BaseElement, IBaseElement } from "../BaseElement/index.js";

export type ISelectItem = IBaseElement & Partial<Omit<HTMLOptionElement, "style" | "children">>

export function SelectItem({ 
  ...props
}: ISelectItem): HTMLOptionElement {
  const SelectItem = BaseElement<ISelectItem>({
    tag: "option",
    ...props
  }) as HTMLOptionElement;
  
  return SelectItem;
}
