import { BaseElement, IBaseElement } from "../BaseElement/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

type AlertSeverity = "alert-error" | "alert-warning" | "alert-info" | "alert-success";

export interface IAlert extends IBaseElement {
  severity?: AlertSeverity;
  className?: string;
}

export function Alert({
  severity = "alert-info",
  ...props
}: IAlert = {}): HTMLDivElement {
  const className = mergeClasses([
    "alert",
    severity,
    props.className,
  ]);

  return BaseElement({
    ...props,
    className,
  }) as HTMLDivElement;
}