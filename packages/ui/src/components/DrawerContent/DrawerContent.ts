import { mergeClasses } from "../../utils/mergeClasses.js";
import { IDrawerContent } from "./DrawerContent.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";

export function DrawerContent({
  position = "left",
  ...props
}: IDrawerContent = {}): HTMLDivElement {
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

  return BaseElement<IDrawerContent>({
    ...props,
    className
  }) as HTMLDivElement;
}
