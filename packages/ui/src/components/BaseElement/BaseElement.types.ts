import { IRefObject } from "../../hooks/useRef.js";

type ListenerKeys = keyof GlobalEventHandlersEventMap;

export type Listener = {
  [K in ListenerKeys]?: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any
}

export type TBaseMap = {
  a: HTMLAnchorElement;
  // abbr: HTMLElement;
  // acronym: HTMLElement; // deprecated
  // address: HTMLElement;
  area: HTMLAreaElement;
  // article: HTMLElement;
  // aside: HTMLElement;
  audio: HTMLAudioElement;
  // b: HTMLElement;
  base: HTMLBaseElement;
  // bdi: HTMLElement;
  // bdo: HTMLElement;
  // big: HTMLElement; // deprecated
  blockquote: HTMLQuoteElement;
  body: HTMLBodyElement;
  br: HTMLBRElement;
  button: HTMLButtonElement;
  canvas: HTMLCanvasElement;
  caption: HTMLTableCaptionElement;
  // center: HTMLElement; // deprecated
  // cite: HTMLElement;
  // code: HTMLElement;
  col: HTMLTableColElement;
  colgroup: HTMLTableColElement;
  data: HTMLDataElement;
  datalist: HTMLDataListElement;
  // dd: HTMLElement;
  del: HTMLModElement;
  details: HTMLDetailsElement;
  // dfn: HTMLElement;
  dialog: HTMLDialogElement;
  // dir: HTMLElement; // deprecated
  div: HTMLDivElement;
  dl: HTMLDListElement;
  // dt: HTMLElement;
  // em: HTMLElement;
  embed: HTMLEmbedElement;
  fieldset: HTMLFieldSetElement;
  // figcaption: HTMLElement;
  // figure: HTMLElement;
  // font: HTMLElement; // deprecated
  // footer: HTMLElement;
  form: HTMLFormElement;
  // frame: HTMLElement; // deprecated
  // frameset: HTMLElement; // deprecated
  h1: HTMLHeadingElement;
  head: HTMLHeadElement;
  // header: HTMLElement;
  // hgroup: HTMLElement;
  hr: HTMLHRElement;
  html: HTMLHtmlElement;
  // i: HTMLElement;
  iframe: HTMLIFrameElement;
  // image: HTMLElement; // Non-standard, Deprecated
  img: HTMLImageElement;
  input: HTMLInputElement;
  ins: HTMLModElement;
  // kbd: HTMLElement;
  label: HTMLLabelElement;
  legend: HTMLLegendElement;
  li: HTMLLIElement;
  link: HTMLLinkElement;
  // main: HTMLElement;
  map: HTMLMapElement;
  // mark: HTMLElement;
  // marquee: HTMLElement; // deprecated
  menu: HTMLMenuElement;
  // menuitem: HTMLElement; // Non-standard, Deprecated
  meta: HTMLMetaElement;
  meter: HTMLMeterElement;
  // nav: HTMLElement;
  // nobr: HTMLElement; // deprecated
  // noembed: HTMLElement; // deprecated
  // noframes: HTMLElement; // deprecated
  // noscript: HTMLElement;
  object: HTMLObjectElement;
  ol: HTMLOListElement;
  optgroup: HTMLOptGroupElement;
  option: HTMLOptionElement;
  output: HTMLOutputElement;
  p: HTMLParagraphElement;
  param: HTMLParamElement; // deprecated
  picture: HTMLPictureElement;
  // plaintext: HTMLElement; // deprecated
  // portal: HTMLElement; // Experimental
  pre: HTMLPreElement;
  progress: HTMLProgressElement;
  q: HTMLQuoteElement;
  // rb: HTMLElement; // deprecated
  // rp: HTMLElement;
  // rt: HTMLElement;
  // rtc: HTMLElement; // deprecated
  // ruby: HTMLElement;
  // s: HTMLElement;
  // samp: HTMLElement;
  script: HTMLScriptElement;
  // search: HTMLElement;
  // section: HTMLElement;
  select: HTMLSelectElement;
  slot: HTMLSlotElement;
  // small: HTMLElement;
  source: HTMLSourceElement;
  span: HTMLSpanElement;
  // strike: HTMLElement; // deprecated
  // strong: HTMLElement;
  style: HTMLStyleElement;
  // sub: HTMLElement;
  // summary: HTMLElement;
  // sup: HTMLElement;
  table: HTMLTableElement;
  tbody: HTMLTableSectionElement;
  td: HTMLTableCellElement;
  template: HTMLTemplateElement;
  textarea: HTMLTextAreaElement;
  tfoot: HTMLTableSectionElement;
  th: HTMLTableCellElement;
  thead: HTMLTableSectionElement;
  time: HTMLTimeElement;
  title: HTMLTitleElement;
  tr: HTMLTableRowElement;
  track: HTMLTrackElement;
  // tt: HTMLElement; // deprecated
  // u: HTMLElement;
  ul: HTMLUListElement;
  // "var": HTMLElement;
  video: HTMLVideoElement;
  // wbr: HTMLElement;
  // xmp: HTMLElement; // deprecated
  //[key: string]: HTMLElement;
}

export type TBaseVariants = keyof HTMLElementTagNameMap

export type IBase<T extends TBaseVariants> = {
  id?: string;
  tag?: T; // | HTMLDivElement["tagName"];
  className?: string;
  listeners?: Listener;
  ref?: IRefObject<HTMLElement>;
  dataset?: Partial<DOMStringMap>;
  style?: Partial<Omit<CSSStyleDeclaration, "parentRule" | "length">>;
  children?: (string | Node) | (string | Node)[]
} & Partial<Omit<HTMLElementTagNameMap[T], "children" | "style">>; 

// TODO: Check elements that omits sizes and rename it