import { IToast } from "../Toast/Toast.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function ToastContainer({
  horizontal = "toast-end",
  vertical = "toast-top",
  duration = 5000,
  asChild = false,
  ...props
}: IToast = {}): HTMLDivElement {
  const className = mergeClasses([
    "toast-container",
    props.className,
  ]);

  return BaseElement({ 
    ...props, 
    className,
    dataset: {
      horizontal,
      vertical,
      duration: duration.toString(),
      asChild: asChild ? "true" : "false",
    },
  }) as HTMLDivElement;
}