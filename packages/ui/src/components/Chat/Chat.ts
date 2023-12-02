import { mergeClasses } from "../../utils/mergeClasses.js";
import { Box, IBox } from "../Box/Box.js";

export interface IChatExt extends IBox {
  position?: "chat-start" | "chat-end";
}

export type IChat = IChatExt & Partial<Omit<HTMLDivElement, "style" | "children">>;

export function Chat({
  position = "chat-start",
  ...props
}: IChat = {}): HTMLDivElement {
  const className = mergeClasses([
    "chat",
    position,
    props.className,
  ]);

  return Box({
    ...props,
    className
  });
}
