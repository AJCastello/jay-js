import { ISelectItem } from "./SelectItem.types.js";
import { BaseElement } from "../BaseElement/index.js";

export function SelectItem({
  ...props
}: ISelectItem = {}): HTMLOptionElement {
  const SelectItem = BaseElement<ISelectItem>({
    tag: "option",
    ...props
  }) as HTMLOptionElement;

  return SelectItem;
}
