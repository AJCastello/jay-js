import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { IBottomNavigation } from "./BottomNavigation.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function BottomNavigation<T extends TBaseTagMap = "div">({
  size,
  ...props
}: IBottomNavigation<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "btm-nav",
    size,
    props.className,
  ]);

  return Base({
    ...props,
    className
  }) as HTMLElementTagNameMap[T];
}
