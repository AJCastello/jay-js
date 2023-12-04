import { IList } from "../List/List.js";

export interface ISteps extends IList {
  orientation?: "steps-vertical" | "steps-horizontal";
}
