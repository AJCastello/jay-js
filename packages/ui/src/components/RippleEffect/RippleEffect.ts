import "./RippleEffect.style.css";
import { Base } from "../Base/Base.js";

export function RippleEffect(event: MouseEvent): HTMLSpanElement {
  if ("layerX" in event && "layerY" in event) {
    const x = event.layerX;
    const y = event.layerY;

    const circle = Base({
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
  return Base({
    tag: "span"
  }) as HTMLSpanElement;
}
