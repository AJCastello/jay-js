import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TCollapseTitle } from "./CollapseTitle.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function CollapseTitle<T extends TBaseTagMap = "div">({
  ...props
}: TCollapseTitle<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "collapse-title",
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
