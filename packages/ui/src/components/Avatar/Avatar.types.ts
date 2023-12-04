import { IBox } from "../Box/Box.types.js";

export interface IAvatarExt extends IBox {
  state?: "online" | "offline";
}

export type IAvatar = IAvatarExt & Partial<Omit<HTMLDivElement, "style" | "children">>;
