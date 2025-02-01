import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type IAvatar<T extends TBaseTagMap> = {
  state?: "avatar-online" | "avatar-offline";
} & TBase<T>;
