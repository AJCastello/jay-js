import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TDrawerOverlay<T extends TBaseTagMap> = {
  for?: string;
} & TBase<T>;
