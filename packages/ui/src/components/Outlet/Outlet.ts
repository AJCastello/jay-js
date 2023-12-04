import { BaseElement } from "../BaseElement/BaseElement.js";

export function Outlet(): HTMLDivElement {
  return BaseElement({
    style: {
      display: "contents"
    },
    dataset: {
      "router": "outlet"
    }
  }) as HTMLDivElement;
}