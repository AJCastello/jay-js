import { Box, IBox } from "../Box/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export interface IDivider extends IBox {
  orientation?: "divider-vertical" | "divider-horizontal";
};

export function Divider({ orientation, ...props }: IDivider = {}): HTMLDivElement {
  const divider = Box({
    ...props,
    className: mergeClasses([
      "divider",
      orientation,
      props.className
    ])
  });
  return divider;
}
