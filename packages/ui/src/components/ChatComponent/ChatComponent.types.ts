import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IChatComponentExt extends IBaseElement {
  component?: "chat-bubble" | "chat-image" | "chat-header" | "chat-footer";
  color?: "chat-bubble-primary" | "chat-bubble-secondary" | "chat-bubble-accent" | "chat-bubble-info" | "chat-bubble-success" | "chat-bubble-warning" | "chat-bubble-error";
}

export type IChatComponent = IChatComponentExt & Partial<Omit<HTMLDivElement, "style" | "children">>;