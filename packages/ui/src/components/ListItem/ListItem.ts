import { IListItem } from "./ListItem.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";

export function ListItem({
  ...props
}: IListItem = {}): HTMLLIElement {
  return BaseElement<IListItem>({
    tag: "li",
    ...props
  }) as HTMLLIElement;
}
