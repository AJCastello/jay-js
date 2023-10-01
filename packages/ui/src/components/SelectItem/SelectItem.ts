import { BaseElement, IBaseElement } from "..";

export type ISelectItem = IBaseElement & Partial<Omit<HTMLOptionElement, "style">>

export function SelectItem({ 
  ...props
}: ISelectItem): HTMLOptionElement {
  const SelectItem = BaseElement<ISelectItem>({
    tag: "option",
    ...props
  }) as HTMLOptionElement;
  
  return SelectItem;
}
