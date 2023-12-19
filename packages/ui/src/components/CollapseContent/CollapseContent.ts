import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TCollapseContent } from "./CollapseContent.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function CollapseContent<T extends TBaseTagMap = "div">({
  ...props
}: TCollapseContent<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "collapse-content",
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
