import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TChat<T extends TBaseTagMap> = {
  position?: "chat-start" | "chat-end";
} & TBase<T>;
