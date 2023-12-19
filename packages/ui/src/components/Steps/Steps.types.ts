import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TSteps<T extends TBaseTagMap> = {
  orientation?: "steps-vertical" | "steps-horizontal";
} & TBase<T>;
