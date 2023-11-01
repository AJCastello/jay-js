import { Box, IBox } from "..";
import { mergeClasses } from "../../";

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
