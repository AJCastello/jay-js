import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IAvatarExt extends IBaseElement {
  state?: "online" | "offline";
}

export type IAvatar = IAvatarExt & Partial<Omit<HTMLDivElement, "style" | "children">>;
