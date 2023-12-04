import { IAlert } from "./Alert.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Alert({
  severity = "alert-info",
  ...props
}: IAlert = {}): HTMLDivElement {
  const className = mergeClasses([
    "alert",
    severity,
    props.className,
  ]);

  return BaseElement<IAlert>({
    ...props,
    className,
  }) as HTMLDivElement;
}
