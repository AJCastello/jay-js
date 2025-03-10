import { mergeClasses } from "../../utils/mergeClasses.js";
import { uniKey } from "../../utils/uniKey.js";
import { TBase, TBaseTagMap, TStyle } from "./Base.types.js";

export function Base<T extends TBaseTagMap = "div">({
  id,
  tag,
  ref,
  style,
  children,
  dataset,
  className,
  listeners,
  onmount,
  ...props
}: TBase<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
  const base = document.createElement(tag || "div");
  ref && (ref.current = base);
  id ? base.id = id : base.id = uniKey();

  if (className) {
    if (typeof className === "function" && (className as Function).name.includes("_set_value_effect")) {
      (className as Function)(base, "className");
    } else {
      base.className = mergeClasses([className])
    }
  };

  listeners && Object.entries(listeners).forEach(([key, value]) => {
    base.addEventListener(key, value as EventListener);
  });

  style && Object.entries(style).forEach(([key, value]: [string, any]) => {
    if (key === "parentRule" || key === "length") return;
    base.style[key as keyof TStyle] = value;
  });

  dataset && Object.entries(dataset).forEach(([key, value]) => {
    base.dataset[key] = value as string;
  });

  onmount && setTimeout(() => onmount(base));

  if (children) {
    if (children instanceof Promise) {
      const elementSlot = document.createElement("jayjs-lazy-slot");
      base.appendChild(elementSlot);
      children
        .then(resolvedChild => {
          if (resolvedChild && typeof resolvedChild !== "boolean") {
            elementSlot.replaceWith(resolvedChild);
          }
        })
        .catch(error => {
          console.error("Failed to resolve child promise:", error)
        })
    } else {
      if (Array.isArray(children)) {
        children.forEach((child) => {
          if (child) {
            if (typeof child !== "boolean") {
              appendChildToBase(base, child);
            }
          }
        });
      } else {
        if (typeof children !== "boolean") {
          appendChildToBase(base, children);
        }
      }
    }
  }

  props && Object.entries(props).forEach(([key, value]) => {
    try {
      (base as any)[key] = value;
    } catch (error) {
      if (error instanceof TypeError) {
        console.warn(`JayJS: Cannot set property "${key}" of type "${typeof value}" to "${value}".`);
        throw error;
      }
    }
  });
  return base as HTMLElementTagNameMap[T];
}

function appendChildToBase(base: HTMLElement, child: string | Node | boolean | null | undefined | Promise<string | Node | boolean | null | undefined>): void {
  if (child instanceof Promise) {
    const elementSlot = document.createElement("jayjs-lazy-slot");
    base.appendChild(elementSlot);
    child.then((resolvedChild) => {
      if (resolvedChild && typeof resolvedChild !== "boolean") {
        elementSlot.replaceWith(resolvedChild);
      }
    });
    return;
  }
  if (typeof child === "string") {
    base.appendChild(document.createTextNode(child));
    return;
  }
  if (child && typeof child !== "boolean") {
    base.appendChild(child);
  }
}
