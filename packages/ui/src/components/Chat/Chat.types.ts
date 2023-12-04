import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IChatExt extends IBaseElement {
  position?: "chat-start" | "chat-end";
}

export type IChat = IChatExt & Partial<Omit<HTMLDivElement, "style" | "children">>;