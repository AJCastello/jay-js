import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TFooter<T extends TBaseTagMap> = {
  position?: "footer-center";
} & TBase<T>;
