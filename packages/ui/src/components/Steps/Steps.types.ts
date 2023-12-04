import { IList } from "../List/List.types.js";

export interface ISteps extends IList {
  orientation?: "steps-vertical" | "steps-horizontal";
}
