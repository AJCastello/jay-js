import { IList } from "./List.types.js";
import { BaseElement } from "../BaseElement/index.js";

export function List({
  ...props
}: IList = {}): HTMLUListElement {
  const list = BaseElement<IList>({
    tag: "ul",
    ...props
  }) as HTMLUListElement;

  return list;
}
