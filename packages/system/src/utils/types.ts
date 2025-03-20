export type TRenderOptions = {
  insert?: "append" | "prepend";
}

export type TRenderContent = Node | string | HTMLElement | (Node | string | HTMLElement)[] | null | undefined;

export type TRenderTarget = HTMLElement | string | null;

export type TQueryOptions = {
  onlyVisible?: boolean;
  includeNested?: boolean;
}