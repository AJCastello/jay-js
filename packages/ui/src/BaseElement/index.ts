import { IRefObject, uniKey } from "..";

type ListenerKeys = keyof GlobalEventHandlersEventMap;

export type Listener = {
  [K in ListenerKeys]?: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any
}

export interface IBaseElement extends Partial<Omit<HTMLElement, "style">> {
  id?: string;
  tag?: string;
  ref?: IRefObject<HTMLElement>;
  className?: string;
  listeners?: Listener;
  style?: Partial<CSSStyleDeclaration>;
  dataset?: Partial<DOMStringMap>;
  [key: string]: any;
}

export function BaseElement({
  id,
  tag,
  ref,
  style,
  dataset,
  className,
  listeners,
  ...props
}: IBaseElement): HTMLElement {
  const baseElement = document.createElement(tag || "div");

  
  // this may cause memory leak
  // that's why we need to use MutationObserver
  // so we can remove the listener when the element is removed from the DOM
  // besides, we can use the onMount event to do the same thing
  // baseElement.addEventListener("DOMNodeRemovedFromDocument", () => {
  //   Object.entries(listeners).forEach(([key, value]) => {
  //     baseElement.removeEventListener(key, value as EventListener);
  //   });
  // });
  // baseElement.addEventListener("DOMNodeInsertedIntoDocument", () => {
  //   Object.entries(listeners).forEach(([key, value]) => {
  //     baseElement.addEventListener(key, value as EventListener);
  //   });
  // });
  

  ref && (ref.current = baseElement);

  className && (baseElement.className = className);

  id ? baseElement.id = id : baseElement.id = uniKey();

  listeners && Object.entries(listeners).forEach(([key, value]) => {
    baseElement.addEventListener(key, value as EventListener);
  });

  style && Object.entries(style).forEach(([key, value]) => {
    if (key === "parentRule" || key === "length") return;

    // baseElement.style?.setProperty(key, value as string); 
    // IMPORTANT: SetPropertiy do not accept camelCase, only kebab-case
    // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty

    (baseElement.style as any)[key] = value;
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
