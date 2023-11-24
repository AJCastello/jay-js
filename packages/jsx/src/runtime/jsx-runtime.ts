import { BaseElement, Fragment } from "@jay-js/ui";

export interface IBaseElement extends Partial<Omit<HTMLElement, "style" | "children">> {
  className?: string;
  dataset?: Partial<DOMStringMap>;
  style?: Partial<Omit<CSSStyleDeclaration, "parentRule" | "length">>;
  children?: (string | Node) | (string | Node)[]
}

declare namespace JSX {
  interface IntrinsicElements {
    div: IBaseElement & Partial<Omit<HTMLDivElement, "style" | "children">>;
    span: IBaseElement & Partial<Omit<HTMLSpanElement, "style" | "children">>;
    p: IBaseElement & Partial<Omit<HTMLParagraphElement, "style" | "children">>;
    h1: IBaseElement & Partial<Omit<HTMLHeadingElement, "style" | "children">>;
    h2: IBaseElement & Partial<Omit<HTMLHeadingElement, "style" | "children">>;
    h3: IBaseElement & Partial<Omit<HTMLHeadingElement, "style" | "children">>;
    h4: IBaseElement & Partial<Omit<HTMLHeadingElement, "style" | "children">>;
    h5: IBaseElement & Partial<Omit<HTMLHeadingElement, "style" | "children">>;
    h6: IBaseElement & Partial<Omit<HTMLHeadingElement, "style" | "children">>;
    ul: IBaseElement & Partial<Omit<HTMLUListElement, "style" | "children">>;
    li: IBaseElement & Partial<Omit<HTMLLIElement, "style" | "children">>;
    ol: IBaseElement & Partial<Omit<HTMLOListElement, "style" | "children">>;
    a: IBaseElement & Partial<Omit<HTMLAnchorElement, "style" | "children">>;
    button: IBaseElement & Partial<Omit<HTMLButtonElement, "style" | "children">>;
    input: IBaseElement & Partial<Omit<HTMLInputElement, "style" | "children">>;
    form: IBaseElement & Partial<Omit<HTMLFormElement, "style" | "children">>;
    label: IBaseElement & Partial<Omit<HTMLLabelElement, "style" | "children">>;
    img: IBaseElement & Partial<Omit<HTMLImageElement, "style" | "children">>;
    section: IBaseElement & Partial<Omit<HTMLElement, "style" | "children">>;
    header: IBaseElement & Partial<Omit<HTMLElement, "style" | "children">>;
    footer: IBaseElement & Partial<Omit<HTMLElement, "style" | "children">>;
    aside: IBaseElement & Partial<Omit<HTMLElement, "style" | "children">>;
    nav: IBaseElement & Partial<Omit<HTMLElement, "style" | "children">>;
    main: IBaseElement & Partial<Omit<HTMLElement, "style" | "children">>;
    article: IBaseElement & Partial<Omit<HTMLElement, "style" | "children">>;
    canvas: IBaseElement & Partial<Omit<HTMLCanvasElement, "style" | "children">>;
    video: IBaseElement & Partial<Omit<HTMLVideoElement, "style" | "children">>;
    iframe: IBaseElement & Partial<Omit<HTMLIFrameElement, "style" | "children">>;
    audio: IBaseElement & Partial<Omit<HTMLAudioElement, "style" | "children">>;
    table: IBaseElement & Partial<Omit<HTMLTableElement, "style" | "children">>;
    tr: IBaseElement & Partial<Omit<HTMLTableRowElement, "style" | "children">>;
    td: IBaseElement & Partial<Omit<HTMLTableDataCellElement, "style" | "children">>;
    th: IBaseElement & Partial<Omit<HTMLTableHeaderCellElement, "style" | "children">>;
    tbody: IBaseElement & Partial<Omit<HTMLTableSectionElement, "style" | "children">>;
    thead: IBaseElement & Partial<Omit<HTMLTableSectionElement, "style" | "children">>;
    tfoot: IBaseElement & Partial<Omit<HTMLTableSectionElement, "style" | "children">>;
    textarea: IBaseElement & Partial<Omit<HTMLTextAreaElement, "style" | "children">>;
    select: IBaseElement & Partial<Omit<HTMLSelectElement, "style" | "children">>;
    option: IBaseElement & Partial<Omit<HTMLOptionElement, "style" | "children">>;
    optgroup: IBaseElement & Partial<Omit<HTMLOptGroupElement, "style" | "children">>;
    blockquote: IBaseElement & Partial<Omit<HTMLQuoteElement, "style" | "children">>;
    cite: IBaseElement & Partial<Omit<HTMLElement, "style" | "children">>;
    details: IBaseElement & Partial<Omit<HTMLDetailsElement, "style" | "children">>;
    summary: IBaseElement & Partial<Omit<HTMLElement, "style" | "children">>;
    progress: IBaseElement & Partial<Omit<HTMLProgressElement, "style" | "children">>;
    meter: IBaseElement & Partial<Omit<HTMLMeterElement, "style" | "children">>;
    time: IBaseElement & Partial<Omit<HTMLTimeElement, "style" | "children">>;
    output: IBaseElement & Partial<Omit<HTMLOutputElement, "style" | "children">>;
    ruby: IBaseElement & Partial<Omit<HTMLElement, "style" | "children">>;
    rt: IBaseElement & Partial<Omit<HTMLElement, "style" | "children">>;
    rp: IBaseElement & Partial<Omit<HTMLElement, "style" | "children">>;
    datalist: IBaseElement & Partial<Omit<HTMLDataListElement, "style" | "children">>;
    keygen: IBaseElement & Partial<Omit<HTMLElement, "style" | "children">>;
    area: IBaseElement & Partial<Omit<HTMLAreaElement, "style" | "children">>;
    map: IBaseElement & Partial<Omit<HTMLMapElement, "style" | "children">>;
    track: IBaseElement & Partial<Omit<HTMLTrackElement, "style" | "children">>;
    embed: IBaseElement & Partial<Omit<HTMLEmbedElement, "style" | "children">>;
    object: IBaseElement & Partial<Omit<HTMLObjectElement, "style" | "children">>;
    colgroup: IBaseElement & Partial<Omit<HTMLTableColElement, "style" | "children">>;
    legend: IBaseElement & Partial<Omit<HTMLLegendElement, "style" | "children">>;
    source: IBaseElement & Partial<Omit<HTMLSourceElement, "style" | "children">>;
    del: IBaseElement & Partial<Omit<HTMLModElement, "style" | "children">>;
    ins: IBaseElement & Partial<Omit<HTMLModElement, "style" | "children">>;
    caption: IBaseElement & Partial<Omit<HTMLTableCaptionElement, "style" | "children">>;
    col: IBaseElement & Partial<Omit<HTMLTableColElement, "style" | "children">>;
    [elemName: string]: any;
  }
}

function jayJSX(tag: any, props: any, ...children: any[]): HTMLElement {
  if (typeof tag === "function") {
    return tag({ ...props, children });
  }
  const element = BaseElement({ tag, ...props, children });
  return element;
}

function jsx(tag: any, props: any): Promise<HTMLElement> | HTMLElement {
  if (typeof tag === "function") {
    return tag({ ...props });
    // const result = tag({ ...props });
    // if (result instanceof Promise) {
    //   return Promise.resolve(result);
    // }
    // return result as HTMLElement;
  }
  const element = BaseElement({ tag, ...props });
  return element;
}

export { 
  jsx,
  jsx as jsxs,
  jayJSX,  
  Fragment,
  JSX
};
