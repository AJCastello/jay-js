import { IBaseElement } from "../BaseElement";

export type IInput = IBaseElement & Partial<Omit<HTMLInputElement, "style" | "size" | "label">>