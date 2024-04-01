import { Base } from "../Base/Base.js";
import { useDrawer } from "../../hooks/useDrawer.js";
import { TBaseTagMap } from "../Base/Base.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TDrawerOverlay } from "./DrawerOverlay.types.js";

export function DrawerOverlay<T extends TBaseTagMap = "div">({
  ...props
}: TDrawerOverlay<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "transition-opacity",
    "ease-in-out",
    "duration-300",
    "opacity-0",
    "fixed",
    "inset-0",
    "bg-black/30",
    "z-10",
    props.className
  ]);

  const drawerToggle = useDrawer({ for: props.for });

  return Base({
    ...props,
    className,
    dataset: {
      drawerFor: props.for
    },
    onclick: props.onclick || drawerToggle
  }) as HTMLElementTagNameMap[T];
}