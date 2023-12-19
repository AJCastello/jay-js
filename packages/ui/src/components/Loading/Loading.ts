import { TLoading } from "./Loading.types.js";
import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Loading<T extends TBaseTagMap = "span">({
  type = "loading-spinner",
  size = "loading-md",
  ...props
}: TLoading<T> = { tag: "span"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "loading",
    type,
    size,
    props.className
  ]);

  return Base({
    tag: "span",
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
