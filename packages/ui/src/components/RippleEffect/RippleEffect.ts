import { BaseElement } from "../BaseElement/index.js";

import "./RippleEffect.style.css";

export function RippleEffect(event: MouseEvent): HTMLSpanElement {
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
