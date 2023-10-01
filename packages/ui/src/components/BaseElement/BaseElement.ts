import { IRefObject, uniKey } from "../../utils";

type ListenerKeys = keyof GlobalEventHandlersEventMap;

export type Listener = {
  [K in ListenerKeys]?: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any
}

export interface IBaseElement extends Partial<Omit<HTMLElement, "style">> {
  id?: string;
  tag?: string;
  className?: string;
  listeners?: Listener;
  ref?: IRefObject<HTMLElement>;
  dataset?: Partial<DOMStringMap>;
  style?: Partial<Omit<CSSStyleDeclaration, "parentRule" | "length">>;
  // [key: string]: any;
}

export function BaseElement<T>({
  id,
  tag,
  ref,
  style,
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
