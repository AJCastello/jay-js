import { IList } from "../List/List.types.js";

export interface IMenu extends IList {
  size?: "menu-xs" | "menu-sm" | "menu-md" | "menu-lg";
  position?: "menu-vertical" | "menu-horizontal";
}
