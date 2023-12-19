import { Base } from "../Base/Base.js";
import { TSpace } from "./Space.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Space<T extends TBaseTagMap = "div">({
  h = "1rem",
  ...props
}: TSpace<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  return Base({
    style: {
      height: h,
    },
    ...props
  }) as HTMLElementTagNameMap[T];
}
