import { mergeClasses } from "../../utils/mergeClasses.js";
import { Box, IBox } from "../Box/Box.js";

export interface IAvatarExt extends IBox {
  state?: "online" | "offline";
}

export type IAvatar = IAvatarExt & Partial<Omit<HTMLDivElement, "style" | "children">>;

export function Avatar({
  state,
  ...props
}: IAvatar = {}): HTMLDivElement {
  const className = mergeClasses([
    "avatar",
    state,
    props.className,
  ]);

  return Box({
    ...props,
    className
  });
}
