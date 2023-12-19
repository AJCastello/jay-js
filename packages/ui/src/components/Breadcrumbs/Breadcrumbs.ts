import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TBreadcrumbs } from "./Breadcrumbs.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Breadcrumbs<T extends TBaseTagMap = "div">({
  ...props
}: TBreadcrumbs<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "breadcrumbs",
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
