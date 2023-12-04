import { IToast } from "./Toast.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Toast({
  horizontal = "toast-end",
  vertical = "toast-top",
  asChild = false,
  ...props
}: IToast = {}): HTMLDivElement {
  const className = mergeClasses([
    "toast",
    asChild ? "absolute" : "",
    horizontal,
    vertical,
    props.className,
  ]);

  const toast = BaseElement({ ...props, className }) as HTMLDivElement;

  const resizeObserver = new ResizeObserver(entries => {
    if (!toast.firstChild) {
      toast.remove();
    }    
  });

  resizeObserver.observe(toast);
  return toast;
}

