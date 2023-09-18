import { BaseElement, IBaseElement } from "../BaseElement";
import { mergeClasses } from "../../utils/mergeClasses";

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

  const alert = BaseElement({
    ...props,
    className,
  }) as HTMLDivElement;

  return alert;
}