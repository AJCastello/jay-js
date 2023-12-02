import { mergeClasses } from "../../utils/mergeClasses.js";
import { Box, IBox } from "../Box/Box.js";

export interface IJoinExt extends IBox {
  // options
}

export type IJoin = IJoinExt &
  Partial<Omit<HTMLDivElement, "style" | "children">>;

export function Join({ ...props }: IJoin = {}): HTMLDivElement {
  const className = mergeClasses(["join", props.className]);

  return Box({
    ...props,
    className,
  });
}
