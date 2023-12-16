import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TModal<T extends TBaseTagMap> = {
  position?: "modal-top" | "modal-bottom" | "modal-middle";
} & TBase<T>;
