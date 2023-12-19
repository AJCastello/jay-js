import { TList } from "./List.types.js";
import { Base } from "../Base/Base.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function List<T extends TBaseTagMap = "ul">({ ...props }: TList<T> = { tag: "ul"}): HTMLElementTagNameMap[T] {
  return Base({
    tag: "ul",
    ...props,
  }) as HTMLElementTagNameMap[T];
}
