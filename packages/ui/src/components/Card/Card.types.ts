import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TCard<T extends TBaseTagMap> = {
  imagePosition?: "left" | "right";
  imageFull?: boolean;
  variant?: "card-bordered";
  format?: "card-compact" | "card-normal";
  ripple?: boolean;
} & TBase<T>;
