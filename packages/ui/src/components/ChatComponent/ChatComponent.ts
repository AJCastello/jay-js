import { mergeClasses } from "../../utils/mergeClasses.js";
import { Box, IBox } from "../Box/index.js";

export interface IChatComponentExt extends IBox {
  component?: "chat-bubble" | "chat-image" | "chat-header" | "chat-footer";
  color?: "chat-bubble-primary" | "chat-bubble-secondary" | "chat-bubble-accent" | "chat-bubble-info" | "chat-bubble-success" | "chat-bubble-warning" | "chat-bubble-error";
}

export type IChatComponent = IChatComponentExt & Partial<Omit<HTMLDivElement, "style" | "children">>;

export function ChatComponent({
  color,
  component = "chat-bubble",
  ...props
}: IChatComponent = {}): HTMLDivElement {
  const className = mergeClasses([
    component,
    props.className,
  ]);

  return Box({
    ...props,
    className
  });
}