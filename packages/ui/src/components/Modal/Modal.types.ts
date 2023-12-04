import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IModalExt extends IBaseElement {
  position?: "modal-top" | "modal-bottom" | "modal-middle";
}

export type IModal = IModalExt & Partial<Omit<HTMLDialogElement, "style" | "children">>;
