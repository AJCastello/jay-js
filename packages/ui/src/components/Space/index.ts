import { Box, IBaseElement } from "..";

export interface ISpace extends IBaseElement {
  height?: string;
}

export function Space({ height = "1rem", ...props }: ISpace = {}): HTMLElement {
  const space = Box({
    style: {
      height: height,
    },
    ...props
  });

  return space;
}
