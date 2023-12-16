import { TImg } from "./Img.types.js";
import { Base } from "../Base/Base.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Img<T extends TBaseTagMap = "img">({
  ...props
}: TImg<T> = { tag: "img" }): HTMLElementTagNameMap[T] {
  return Base({
    ...props,
    tag: "img",
  }) as HTMLElementTagNameMap[T];
}
