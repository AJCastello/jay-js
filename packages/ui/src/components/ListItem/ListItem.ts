import { BaseElement, IBaseElement } from "../BaseElement/index.js";

export type IListItem = IBaseElement & Partial<Omit<HTMLUListElement, "style" | "children">>

export function ListItem({ 
  ...props
}: IListItem): HTMLUListElement {
  const listItem = BaseElement<IListItem>({
    tag: "li",
    ...props
  }) as HTMLUListElement;
  
  return listItem;
}
