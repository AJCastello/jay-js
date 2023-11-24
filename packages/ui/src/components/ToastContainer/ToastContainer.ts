import { Box } from "../Box/Box.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { IToast } from "../Toast/Toast.js";

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