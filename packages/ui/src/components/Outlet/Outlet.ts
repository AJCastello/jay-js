import { Box } from "..";

export function Outlet() {
  return Box({
    style: {
      display: "contents"
    },
    dataset: {
      "router": "outlet"
    }
  });
}