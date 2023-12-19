import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TDiffResizer } from "./DiffResizer.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function DiffResizer<T extends TBaseTagMap = "div">({
  ...props
}: TDiffResizer<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "diff-resizer",
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
