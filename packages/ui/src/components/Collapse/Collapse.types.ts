import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TCollapse<T extends TBaseTagMap> = {
  variant?: "collapse-arrow" | "collapse-plus";
  forceOpen?: boolean;
  forceClose?: boolean;
} & TBase<T>;
