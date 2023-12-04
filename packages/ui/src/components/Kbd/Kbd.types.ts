import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IKbd extends IBaseElement {
  size?: "kbd-lg" | "kbd-md" | "kbd-sm" | "kbd-xs";
}
