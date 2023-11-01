import { IToast, Toast } from "../components/Toast/Toast";

interface IUseToast {
  for?: string;
}

export function useToast({
  ...props
}: IUseToast = {}) {
  const selector = props.for ? `#${props.for}` : ".toast-container";
  const toastContainer = document.querySelector(selector);

  if (!toastContainer) {
    throw new Error(`useToast: No element found for selector: ${selector}`);
  }

  return function ({
    duration,
    vertical,
    horizontal,
    children,
    ...props
  }: IToast) {
    const toastSettings = (toastContainer as HTMLDivElement).dataset;

    if (!vertical) {
      vertical = (toastSettings.vertical as IToast["vertical"]) || "toast-top";
    }
    if (!horizontal) {
      horizontal = (toastSettings.horizontal as IToast["horizontal"]) || "toast-end";
    }
    if (!duration) {
      duration = Number(toastSettings.duration) || 5000;
    }

    const toastList = toastContainer.querySelectorAll(".toast");
    let existingToast: Element | null = null;

    if (toastList.length > 0) {
      toastList.forEach(toastItem => {
        if (
          toastItem.classList.contains(vertical as string) &&
          toastItem.classList.contains(horizontal as string)
        ) {
          existingToast = toastItem;
        }
      });
    }

    if (existingToast) {
      const currentToast = existingToast as HTMLDivElement;
      if (children) {
        const currentNode = children as HTMLElement;
        currentToast.prepend(currentNode);
        setTimeout(() => {
          currentNode.remove();
        }, duration);
        return;
      }
    }

    const newToast = Toast({
      ...props,
      duration,
      vertical,
      horizontal,
      children,
    })

    if (children) {
      const currentNode = children as HTMLElement;
      setTimeout(() => {
        currentNode.remove();
      }, duration);
    }

    toastContainer.appendChild(newToast);
  }
}