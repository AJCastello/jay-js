import { IDrawer } from "./Drawer.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Drawer({
  asChild = false,
  position = "left",
  ...props
}: IDrawer = {}): HTMLDivElement {

  const positionClass = {
    left: "justify-start",
    right: "justify-end",
    top: "items-start",
    bottom: "items-end"
  };

  const className = mergeClasses([
    asChild ? "absolute" : "fixed",
    "inset-0",
    "flex",
    "hidden",
    "z-30",
    positionClass[position],
    props.className
  ]);

  const drawer = BaseElement({
    ...props,
    className
  }) as HTMLDivElement;

  const drawerId = drawer.id;

  if (document.querySelector(`#${drawerId}`)) {
    const drawerElement = document.querySelector(`#${drawerId}`) as HTMLDivElement;
    return drawerElement;
  }

  return drawer;
}
