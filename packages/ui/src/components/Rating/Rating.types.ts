import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TRating<T extends TBaseTagMap> = {
  size?: "rating-lg" | "rating-md" | "rating-sm" | "rating-xs";
  half?: boolean;
  hidden?: boolean;
} & TBase<T>;
