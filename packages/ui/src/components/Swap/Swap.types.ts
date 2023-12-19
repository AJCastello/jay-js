import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TSwap<T extends TBaseTagMap> = {
  effect?: "swap-rotate" | "swap-flip";
} & TBase<T>;
