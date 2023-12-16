import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TDiffItem } from "./DiffItem.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function DiffItem<T extends TBaseTagMap = "div">({
  side,
  ...props
}: TDiffItem<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    side === "left" ? "diff-left" : "diff-right",
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
