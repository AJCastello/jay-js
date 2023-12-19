import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TSpace<T extends TBaseTagMap> = {
  h?: string;
} & TBase<T>;
