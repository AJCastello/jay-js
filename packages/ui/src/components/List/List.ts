import { BaseElement, IBaseElement } from "../BaseElement";

export type IList = IBaseElement & Partial<Omit<HTMLUListElement, "style">>;

export function List({
  ...props
}: IList = {}): HTMLUListElement {
  const list = BaseElement<IList>({
    tag: "ul",
    ...props
  }) as HTMLUListElement;

  return list;
}