import { uniKey } from "../../utils/uniKey.js";
import { IBaseElement } from "./BaseElement.types.js";

export function BaseElement<T>({
  id,
  tag,
  ref,
  style,
  children,
  dataset,
  className,
  listeners,
  ...props
}: IBaseElement & T): HTMLElement {
  const baseElement = document.createElement(tag || "div");

  ref && (ref.current = baseElement);

  className && (baseElement.className = className);

  id ? baseElement.id = id : baseElement.id = uniKey();

  listeners && Object.entries(listeners).forEach(([key, value]) => {
    baseElement.addEventListener(key, value as EventListener);
  });

  style && Object.entries(style).forEach(([key, value]: [string, any]) => {
    if (key === "parentRule" || key === "length") return;
    baseElement.style[key as keyof IBaseElement["style"]] = value;
  });

  dataset && Object.entries(dataset).forEach(([key, value]) => {
    baseElement.dataset[key] = value as string;
  });

  if (children) {
    if (Array.isArray(children)) {
      baseElement.append(...children);
    } else {
      baseElement.append(children);
    }
  }

  props && Object.entries(props).forEach(([key, value]) => {
    try {
      (baseElement as any)[key] = value;
    } catch (error) {
      if (error instanceof TypeError) {
        console.warn(`JayJS: Cannot set property '${key}' of type '${typeof value}' to '${value}'.`);
        throw error;
      }
    }
  });

  return baseElement;
}
