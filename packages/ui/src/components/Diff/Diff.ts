import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TDiff } from "./Diff.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Diff<T extends TBaseTagMap = "div">({
  ...props
}: TDiff<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "diff",
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
