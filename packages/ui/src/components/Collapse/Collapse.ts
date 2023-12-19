import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TCollapse } from "./Collapse.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Collapse<T extends TBaseTagMap = "div">({
  variant,
  forceOpen,
  forceClose,
  ...props
}: TCollapse<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "collapse",
    variant,
    forceOpen ? "collapse-open" : "",
    forceClose ? "collapse-close" : "",    
    props.className
  ]);

  return Base({
    ...props,
    className
  }) as HTMLElementTagNameMap[T];
}