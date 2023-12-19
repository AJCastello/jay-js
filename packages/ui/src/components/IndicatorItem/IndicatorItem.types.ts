import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TIndicatorItem<T extends TBaseTagMap> = {
  vertical?: "indicator-top" | "indicator-middle" | "indicator-bottom";
  horizontal?: "indicator-start" | "indicator-center" | "indicator-end";
} & TBase<T>;
