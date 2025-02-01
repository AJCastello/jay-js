import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TStack<T extends TBaseTagMap> = {
  position?: "stack-top" | "stack-bottom" | "stack-start" | "stack-end";
} & TBase<T>;
