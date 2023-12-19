import { Base } from "../Base/index.js";
import { TSelectItem } from "./SelectItem.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function SelectItem<T extends TBaseTagMap = "option">({
  ...props
}: TSelectItem<T> = { tag: "option"}): HTMLElementTagNameMap[T] {
  return Base({
    tag: "option",
    ...props
  }) as HTMLElementTagNameMap[T];
}
