import { TBase, TBaseTagMap } from "../Base/Base.types.js";

type ProgressColor =
  | "progress-primary"
  | "progress-secondary"
  | "progress-accent"
  | "progress-info"
  | "progress-success"
  | "progress-warning"
  | "progress-error";

export type TProgress<T extends TBaseTagMap> = {
  color?: ProgressColor;
} & TBase<T>;
