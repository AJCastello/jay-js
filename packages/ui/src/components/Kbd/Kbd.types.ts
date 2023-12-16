import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TKbd<T extends TBaseTagMap> = {
  size?: "kbd-lg" | "kbd-md" | "kbd-sm" | "kbd-xs";
} & TBase<T>;
