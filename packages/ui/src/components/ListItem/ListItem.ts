import { TListItem } from "./ListItem.types.js";
import { Base } from "../Base/Base.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function ListItem<T extends TBaseTagMap = "li">({
  ...props
}: TListItem<T> = { tag: "li" }): HTMLElementTagNameMap[T] {
  return Base({
    tag: "li",
    ...props,
  }) as HTMLElementTagNameMap[T];
}
