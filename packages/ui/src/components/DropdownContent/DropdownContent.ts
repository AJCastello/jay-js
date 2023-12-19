import { Base } from "../Base/Base.js";
import { TBaseTagMap } from "../Base/Base.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TDropdownContent } from "./DropdownContent.types.js";

export function DropdownContent<T extends TBaseTagMap = "div">({
  ...props 
}: TDropdownContent<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "dropdown-content",
    props.className
  ]);
  
  return Base({
    ...props,
    className,
    tabIndex: 0
  }) as HTMLElementTagNameMap[T];
}