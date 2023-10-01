import { mergeClasses } from "../../utils";
import { IBaseElement } from "../BaseElement";
import { Box } from "../Box";

export interface IDrawer extends IBaseElement {
  asChild?: boolean;
  position?: "top" | "left" | "right" | "bottom";
}

export function Drawer({
  asChild = false,
  position = "left",
  ...props
}: IDrawer): HTMLElement | string {

  const positionClass = {
    left: "justify-start",
    right: "justify-end",
    top: "items-start",
    bottom: "items-end"
  };

  const className = mergeClasses([
    "fixed",
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

  if (!asChild) {
    const drawerElement = document.querySelector(`#${drawerId}`);
    if (!drawerElement) {
      document.body.appendChild(drawer);
      return "";
    }
    return "";
  }

  return drawer;
}

interface IUseDrawerToggle {
  for?: string;
}

export function useDrawerToggle({
  ...props
}: IUseDrawerToggle) {

  return function () {
    const drawer = document.querySelector(`#${props.for}`);
    if (drawer && drawer instanceof HTMLElement) {
      const drawerOverlay = document.querySelector(`[data-drawer-for="${props.for}"]`);
      const drawerContent = drawer.querySelector(".drawer-content");

      if(drawer.classList.contains("hidden")) {
        drawer.classList.remove("hidden");
      } else {
        setTimeout(() => {
        drawer.classList.add("hidden");
        }, 300);
      }
      
      setTimeout(() => {
        if (drawerContent && drawerContent instanceof HTMLElement) {

          if (drawerContent.classList.contains("drawer-left")) {
            drawerContent.classList.toggle("-translate-x-full");
          }

          if (drawerContent.classList.contains("drawer-right")) {
            drawerContent.classList.toggle("translate-x-full");
          }

          if (drawerContent.classList.contains("drawer-top")) {
            drawerContent.classList.toggle("-translate-y-full");
          }

          if (drawerContent.classList.contains("drawer-bottom")) {
            drawerContent.classList.toggle("translate-y-full");
          }
          drawerContent.classList.toggle("translate-x-0");
        }

        if (drawerOverlay && drawerOverlay instanceof HTMLElement) {
          drawerOverlay.classList.toggle("opacity-0");
        }
      }, 20);
    }
  };
}
