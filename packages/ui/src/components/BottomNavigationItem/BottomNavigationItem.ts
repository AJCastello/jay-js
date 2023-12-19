import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TBottomNavigationItem } from "./BottomNavigationItem.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function BottomNavigationItem<T extends TBaseTagMap = "div">({  
  active,
  disabled,
  ...props
}: TBottomNavigationItem<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    active ? "active" : "",
    disabled ? "disabled" : "",
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
