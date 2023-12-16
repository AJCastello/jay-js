import { TBase, TBaseTagMap } from "../Base/Base.types.js";

type AlertSeverity = "alert-error" | "alert-warning" | "alert-info" | "alert-success";

export type TAlert<T extends TBaseTagMap> = {
  severity?: AlertSeverity;
} & TBase<T>;
