import { TSection } from "./Section.types.js";
import { Base } from "../Base/Base.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Section<T extends TBaseTagMap = "section">({
  ...props
}: TSection<T> = { tag: "section"}): HTMLElementTagNameMap[T] {
  return Base({
    ...props
  }) as HTMLElementTagNameMap[T];
}
