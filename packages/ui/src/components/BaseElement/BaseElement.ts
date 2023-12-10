import { uniKey } from "../../utils/uniKey.js";
import { IBase, TBaseVariants } from "./BaseElement.types.js";

// export function Base(): HTMLDivElement;
// export function Base<T extends TBaseVariants>({ }: Omit<IBase<T>, "tagName">): HTMLDivElement;

export function Base<T extends TBaseVariants = "div" >({
  id,
  tag = "div" as T,
  ref,
  style,
  children,
  dataset,
  className,
  listeners,
  ...props
}: IBase<T> = {}) {

  const base = document.createElement(tag);

  ref && (ref.current = base);

  className && (base.className = className);

  id ? base.id = id : base.id = uniKey();

  listeners && Object.entries(listeners).forEach(([key, value]) => {
    base.addEventListener(key, value as EventListener);
  });

  style && Object.entries(style).forEach(([key, value]: [string, any]) => {
    if (key === "parentRule" || key === "length") return;
    base.style[key as keyof Omit<CSSStyleDeclaration, "parentRule" | "length">] = value;
  });

  dataset && Object.entries(dataset).forEach(([key, value]) => {
    base.dataset[key] = value as string;
  });

  if (children) {
    if (Array.isArray(children)) {
      base.append(...children);
    } else {
      base.append(children);
    }
  }

  props && Object.entries(props).forEach(([key, value]) => {
    try {
      (base as any)[key] = value;
    } catch (error) {
      if (error instanceof TypeError) {
        console.warn(`JayJS: Cannot set property '${key}' of type '${typeof value}' to '${value}'.`);
        throw error;
      }
    }
  });

  return base;
}

const div = Base();
const div2 = Base({});

const h1 = Base({ tag: "" });
const label = Base({
  tag: "label",
  htmlFor: "test",
});
