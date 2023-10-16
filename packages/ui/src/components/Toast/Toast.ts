import { Box, IBaseElement } from "..";
import { mergeClasses } from "../../utils";

export interface IToastExt extends IBaseElement {
  horizontal?: "toast-start" | "toast-center" | "toast-end";
  vertical?: "toast-top" | "toast-middle" | "toast-bottom";
  duration?: number;
  asChild?: boolean;
  children?: HTMLElement;
}

export type IToast = IToastExt & Partial<Omit<HTMLDivElement, "style" | "children">>;

export function Toast({
  horizontal = "toast-end",
  vertical = "toast-top",
  asChild = false,
  ...props
}: IToast): HTMLDivElement {
  const className = mergeClasses([
    "toast",
    asChild ? "absolute" : "",
    horizontal,
    vertical,
    props.className,
  ]);

  const toast = Box({ ...props, className });

  const resizeObserver = new ResizeObserver(entries => {
    if (!toast.firstChild) {
      toast.remove();
    }    
  });

  resizeObserver.observe(toast);
  return toast;
}

