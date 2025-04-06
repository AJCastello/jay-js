/**
 * @file JSX Runtime implementation for Jay JS
 * @description Provides the JSX transformation functions for production use
 */

import { TBase, Base, Fragment } from "@jay-js/ui";

/**
 * JSX namespace for TypeScript that defines all intrinsic HTML elements
 */
declare namespace JSX {
  interface IntrinsicElements {
    a: TBase<"a">;
    abbr: TBase<"abbr">;
    address: TBase<"address">;
    area: TBase<"area">;
    article: TBase<"article">;
    aside: TBase<"aside">;
    audio: TBase<"audio">;
    b: TBase<"b">;
    base: TBase<"base">;
    bdi: TBase<"bdi">;
    bdo: TBase<"bdo">;
    blockquote: TBase<"blockquote">;
    body: TBase<"body">;
    br: TBase<"br">;
    button: TBase<"button">;
    canvas: TBase<"canvas">;
    caption: TBase<"caption">;
    cite: TBase<"cite">;
    code: TBase<"code">;
    col: TBase<"col">;
    colgroup: TBase<"colgroup">;
    data: TBase<"data">;
    datalist: TBase<"datalist">;
    dd: TBase<"dd">;
    del: TBase<"del">;
    details: TBase<"details">;
    dfn: TBase<"dfn">;
    dialog: TBase<"dialog">;
    div: TBase<"div">;
    dl: TBase<"dl">;
    dt: TBase<"dt">;
    em: TBase<"em">;
    embed: TBase<"embed">;
    fieldset: TBase<"fieldset">;
    figcaption: TBase<"figcaption">;
    figure: TBase<"figure">;
    footer: TBase<"footer">;
    form: TBase<"form">;
    h1: TBase<"h1">;
    h2: TBase<"h2">;
    h3: TBase<"h3">;
    h4: TBase<"h4">;
    h5: TBase<"h5">;
    h6: TBase<"h6">;
    head: TBase<"head">;
    header: TBase<"header">;
    hgroup: TBase<"hgroup">;
    hr: TBase<"hr">;
    html: TBase<"html">;
    i: TBase<"i">;
    iframe: TBase<"iframe">;
    img: TBase<"img">;
    input: TBase<"input">;
    ins: TBase<"ins">;
    kbd: TBase<"kbd">;
    label: TBase<"label">;
    legend: TBase<"legend">;
    li: TBase<"li">;
    link: TBase<"link">;
    main: TBase<"main">;
    map: TBase<"map">;
    mark: TBase<"mark">;
    menu: TBase<"menu">;
    meta: TBase<"meta">;
    meter: TBase<"meter">;
    nav: TBase<"nav">;
    noscript: TBase<"noscript">;
    object: TBase<"object">;
    ol: TBase<"ol">;
    optgroup: TBase<"optgroup">;
    option: TBase<"option">;
    output: TBase<"output">;
    p: TBase<"p">;
    picture: TBase<"picture">;
    pre: TBase<"pre">;
    progress: TBase<"progress">;
    q: TBase<"q">;
    rp: TBase<"rp">;
    rt: TBase<"rt">;
    ruby: TBase<"ruby">;
    s: TBase<"s">;
    samp: TBase<"samp">;
    script: TBase<"script">;
    search: TBase<"search">;
    section: TBase<"section">;
    select: TBase<"select">;
    slot: TBase<"slot">;
    small: TBase<"small">;
    source: TBase<"source">;
    span: TBase<"span">;
    strong: TBase<"strong">;
    style: TBase<"style">;
    sub: TBase<"sub">;
    summary: TBase<"summary">;
    sup: TBase<"sup">;
    table: TBase<"table">;
    tbody: TBase<"tbody">;
    td: TBase<"td">;
    template: TBase<"template">;
    textarea: TBase<"textarea">;
    tfoot: TBase<"tfoot">;
    th: TBase<"th">;
    thead: TBase<"thead">;
    time: TBase<"time">;
    title: TBase<"title">;
    tr: TBase<"tr">;
    track: TBase<"track">;
    u: TBase<"u">;
    ul: TBase<"ul">;
    var: TBase<"var">;
    video: TBase<"video">;
    wbr: TBase<"wbr">;
    [tag: string]: any;
  }
}

/**
 * Type definition for JSX props
 */
export interface JSXProps {
  [key: string]: any;
  children?: any[] | any;
}

/**
 * Type definition for JSX component function
 */
export type JSXComponent = (props: JSXProps) => HTMLElement | Promise<HTMLElement>;

/**
 * JSX function for Jay JS used directly by transpiled code
 * 
 * @param tag - String tag name or component function
 * @param props - Element properties and attributes
 * @param children - Child elements
 * @returns HTMLElement or Promise<HTMLElement>
 */
function jayJSX(
  tag: any,
  props: JSXProps,
  ...children: any[]
): HTMLElement | Promise<HTMLElement> {
  if (typeof tag === "function") {
    return tag({ ...props, children });
  }
  // Use type assertion to get around type checking issues
  // This is safe because Base component expects tag to be a valid HTML tag
  const element = Base({ tag, ...props, children });
  return element;
}

/**
 * JSX transformation function for production use
 * 
 * @param tag - String tag name or component function
 * @param props - Element properties and attributes
 * @returns HTMLElement or Promise<HTMLElement>
 */
function jsx(
  tag: any,
  props: JSXProps
): HTMLElement | Promise<HTMLElement> {
  if (typeof tag === "function") {
    return tag({ ...props });
  }
  // Use type assertion to get around type checking issues
  // This is safe because Base component expects tag to be a valid HTML tag
  const element = Base({ tag, ...props });
  return element;
}

export {
  jsx,
  jsx as jsxs,
  jayJSX,
  Fragment,
  JSX
};
