import { BaseElement } from "../BaseElement";

import "./RippleEffect.style.css";

export function RippleEffect(event: MouseEvent): HTMLSpanElement {
  
  // TODO: check if this is needed
  // const target = event.target as HTMLElement;
  // const rect = target.getBoundingClientRect();
  // const x = event.clientX - rect.left;
  // const y = event.clientY - rect.top;

  const x = (event as any).layerX;
  const y = (event as any).layerY;

  const circle = BaseElement({
    tag: "span",
    className: "ripple-effect",
    style: {
      top: `${y}px`,
      left: `${x}px`,
    },
  }) as HTMLSpanElement;

  setTimeout(() => {
    circle.remove();
  }, 280);

  return circle;
}
