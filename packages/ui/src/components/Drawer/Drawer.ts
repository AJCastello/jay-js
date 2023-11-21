import { mergeClasses } from "../../utils/mergeClasses.js";
import { IBaseElement } from "../BaseElement/index.js";
import { Box } from "../Box/index.js";

export interface IDrawer extends IBaseElement {
  asChild?: boolean;
  position?: "top" | "left" | "right" | "bottom";
}

export function Drawer({
  asChild = false,
  position = "left",
  ...props
}: IDrawer): HTMLElement {

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

  const drawer = Box({
    ...props,
    className
  });

  const drawerId = drawer.id;

  if (document.querySelector(`#${drawerId}`)) {
    const drawerElement = document.querySelector(`#${drawerId}`) as HTMLDivElement;
    return drawerElement;
  }

  return drawer;
}
