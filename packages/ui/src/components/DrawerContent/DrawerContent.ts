import { mergeClasses } from "../../utils/mergeClasses.js";
import { Box, IBox } from "../Box/index.js";

interface IDrawerContent extends IBox {
  position?: "top" | "left" | "right" | "bottom";
}

export function DrawerContent({
  position = "left",
  ...props
}: IDrawerContent): HTMLElement {
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

  return Box({
    ...props,
    className
  });
}
