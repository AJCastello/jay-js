import { IRefObject } from "../../hooks/useRef.js";

type ListenerKeys = keyof GlobalEventHandlersEventMap;

export type Listener = {
  [K in ListenerKeys]?: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any
}

export interface IBaseElement extends Partial<Omit<HTMLElement, "style" | "children">> {
  id?: string;
  tag?: string;
  className?: string;
  listeners?: Listener;
  ref?: IRefObject<HTMLElement>;
  dataset?: Partial<DOMStringMap>;
  style?: Partial<Omit<CSSStyleDeclaration, "parentRule" | "length">>;
  children?: (string | Node) | (string | Node)[]
}
