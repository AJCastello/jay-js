import { Box } from "../Box/index.js";

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