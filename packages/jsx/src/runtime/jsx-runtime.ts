import { TBase, Base, Fragment } from "@jay-js/ui";

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

function jayJSX(tag: any, props: any, ...children: any[]): HTMLElement {
  if (typeof tag === "function") {
    return tag({ ...props, children });
  }
  const element = Base({ tag, ...props, children });
  return element;
}

function jsx(tag: any, props: any): Promise<HTMLElement> | HTMLElement {
  if (typeof tag === "function") {
    return tag({ ...props });
  }
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
