import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TTabItem<T extends TBaseTagMap> = {
  size?: "tab-xs" | "tab-sm" | "tab-md" | "tab-lg";
  active?: boolean;
  disabled?: boolean;
} & TBase<T>;
