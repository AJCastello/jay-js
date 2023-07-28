import { Box, Button, IBaseElement, IBox, IButton, Typography } from "..";

export interface IDrawer extends IBaseElement {
  drawerContent: Partial<IBox>;
  label: Partial<IButton>;
  overlay?: Partial<IBox>;
  showOverlay?: boolean;
  position?: "top" | "left" | "right" | "bottom";
};

import "./Drawer.style.css";

export function Drawer({
  drawerContent,
  label,
  overlay,
  showOverlay = true,
  position = "left",
  ...props
}: IDrawer): HTMLElement {

  const transform = {
    left: "translateX(-100%)",
    right: "translateX(100%)",
    top: "translateY(-100%)",
    bottom: "translateY(100%)"
  }

  const drawerPositionClass = {
    left: "justify-start",
    right: "justify-end",
    top: "items-start",
    bottom: "items-end"
  }

  const drawerContentPositionClasses = {
    left: "max-w-xs w-full",
    right: "max-w-xs w-full",
    top: "max-h-[150px] h-full",
    bottom: "max-h-[150px] h-full"
  }

  const drawer = Box({
    ...props,
    className: `fixed inset-0 flex hidden z-30 ${drawerPositionClass[position]} ${props.className || ""}`
  });

  const drawerContentBox = Box({
    ...drawerContent,
    className: `drawer-transform relative flex-1 flex ${drawerContentPositionClasses[position]} z-20 ${drawerContent.className || ""}`
  });

  drawerContentBox.style.transform = transform[position];

  const drawerOverlay = Box({
    ...overlay,
    className: `overlay-opacity fixed inset-0 bg-black/30 z-10 ${overlay?.className || ""}`,
    onclick: () => {
      drawerContentBox.style.transform = transform[position];
      drawerOverlay.style.opacity = "0";
      setTimeout(() => drawer.classList.add("hidden"), 300);
    }
  });

  const labelElement = Typography({
    ...label,
    variant: label.variant || "label",
    className: label.className || "",
    tabIndex: 0,
    onclick: () => {
      drawer.classList.remove("hidden");
      setTimeout(() => {
        drawerContentBox.style.transform = "translate(0%, 0%)";
        drawerOverlay.style.opacity = "1";
      }, 20);
    }
  });

  drawer.append(drawerContentBox);

  if (showOverlay) {
    drawer.append(drawerOverlay);
  }

  // document.body.appendChild(drawer);

  const drawerContainer = Box({
    content: [
      labelElement,
      drawer
    ]
  });

  // return labelElement;

  return drawerContainer;
}
