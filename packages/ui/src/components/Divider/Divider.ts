import { Box, IBox } from "..";
import { mergeClasses } from "../../";

export type IDivider = IBox;

export function Divider(props: IDivider = {}): HTMLDivElement {
  const divider = Box({
    ...props,
    className: mergeClasses(["divider", props.className])
  });
  return divider;
}
