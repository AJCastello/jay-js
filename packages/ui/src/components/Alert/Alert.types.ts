import { IBaseElement } from "../BaseElement/BaseElement.types.js";

type AlertSeverity = "alert-error" | "alert-warning" | "alert-info" | "alert-success";

export interface IAlert extends IBaseElement {
  severity?: AlertSeverity;
  className?: string;
}
