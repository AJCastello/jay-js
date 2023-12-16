import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TSwapItem<T extends TBaseTagMap> = {
  state?: "swap-on" | "swap-off";
} & TBase<T>;
