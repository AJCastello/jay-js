import { mergeClasses } from "../../utils/mergeClasses.js";
import { TDrawerContent } from "./DrawerContent.types.js";
import { Base } from "../Base/Base.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function DrawerContent<T extends TBaseTagMap = "div">({
  position = "left",
  ...props
}: TDrawerContent<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const translateClass = {
    left: "-translate-x-full",
    right: "translate-x-full",
    top: "-translate-y-full",
    bottom: "translate-y-full"
  };

  const className = mergeClasses([
    "drawer-content",
    `drawer-${position}`,
    "transition-transform",
    "duration-300",
    "ease-in-out",
    "relative",
    "flex-1",
    "flex",
    "z-20",
    translateClass[position],
    props.className
  ]);

  return Base({
    ...props,
    className
  }) as HTMLElementTagNameMap[T];
}
