// TODO: Refactor

import { Box, IBaseElement } from "..";

export interface IResizableSplitter extends IBaseElement {
  direction?: "horizontal" | "vertical";
}

function bindColumnResizeHandler(
  handle: HTMLElement,
  direction: "horizontal" | "vertical"
) {
  let isDragging = false;
  let previousElement: HTMLElement | null;
  let nextElement: HTMLElement | null;

  handle.addEventListener("mousedown", (e: MouseEvent) => {
    isDragging = true;
    if (e.target instanceof HTMLElement) {
      previousElement = e.target.previousElementSibling as HTMLElement;
      nextElement = e.target.nextElementSibling as HTMLElement;
    }
  });

  document.addEventListener("mousemove", (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const minColumnSize = 50;
    
    if (direction === "horizontal") {
      const parent = handle.parentElement;
      const mousePosition = e.clientY;
      const newSizePrevious = Math.max((mousePosition - parent?.offsetTop! || 0) - (previousElement?.offsetTop || 0), minColumnSize);
      const newSizeNext = Math.max((nextElement?.offsetTop || 0) + (nextElement?.clientHeight || 0) - mousePosition, minColumnSize);
      previousElement?.style.setProperty("height", `${newSizePrevious}px`);
      nextElement?.style.setProperty("height", `${newSizeNext}px`);
      return;
    }

    const mousePosition = e.clientX;
    const newSizePrevious = Math.max(mousePosition - (previousElement?.offsetLeft || 0), minColumnSize);
    const newSizeNext = Math.max((nextElement?.offsetLeft || 0) + (nextElement?.clientWidth || 0) - mousePosition, minColumnSize);
    previousElement?.style.setProperty("width", `${newSizePrevious}px`);
    nextElement?.style.setProperty("width", `${newSizeNext}px`);
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

export function ResizableSplitter({
  direction = "vertical",
  ...props
}: IResizableSplitter = {}) {
  const splitter = Box({
    className: "bg-base-300 flex flex-shrink-0",
    style: {
      cursor: direction === "horizontal" ? "row-resize" : "col-resize",
      width: direction === "horizontal" ? "100%" : "0.25rem",
      height: direction === "horizontal" ? "0.25rem" : "100%",
    },
  });

  bindColumnResizeHandler(splitter, direction);
  return splitter;
}
