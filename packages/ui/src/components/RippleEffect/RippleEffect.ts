import { BaseElement } from "../BaseElement/BaseElement.js";

import "./RippleEffect.style.css";

export function RippleEffect(event: MouseEvent): HTMLSpanElement {
    if ("layerX" in event && "layerY" in event) {
    const x = event.layerX;
    const y = event.layerY;

    const circle = BaseElement({
      tag: "span",
      className: "ripple-effect",
      style: {
        top: `${y}px`,
        left: `${x}px`,
      },
    }) as HTMLSpanElement;

    const timeoutId = setTimeout(() => {
      circle.remove();
    }, 280);

    return circle;
  }
  console.warn("RippleEffect: invalid event");
  return BaseElement({
    tag: "span"
  }) as HTMLSpanElement;
}
