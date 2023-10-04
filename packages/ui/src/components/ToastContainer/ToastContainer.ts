import { Box } from "..";
import { mergeClasses } from "../../utils";
import { IToast } from "../Toast/Toast";

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

  const toastContainer = Box({ 
    ...props, 
    className,
    dataset: {
      horizontal,
      vertical,
      duration: duration.toString(),
      asChild: asChild ? "true" : "false",
    },
  });
  
  return toastContainer;
}