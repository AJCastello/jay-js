import { Box, IBox } from "../Box";

export type IDivider = IBox

export function Divider(props: IDivider = {}): HTMLDivElement {
  const divider = Box({
    ...props,
    className: `divider ${props.className || ""}`,
  });
  return divider;
}
