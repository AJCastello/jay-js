/**
 * Options for controlling how content is rendered
 * @property insert - Determines content insertion mode
 */
export interface IRenderOptions {
  /** Content insertion method: 'append' adds at end, 'prepend' adds at beginning */
  insert?: "append" | "prepend";
}

/**
 * Valid content types that can be rendered
 * Includes DOM nodes, strings, HTML elements, arrays, or null/undefined
 */
export type TRenderContent = Node | string | HTMLElement | (Node | string | HTMLElement)[] | null | undefined;

/**
 * Valid target types where content can be rendered
 * Can be an element reference, selector string, or null
 */
export type TRenderTarget = HTMLElement | string | null;

/**
 * Configuration options for DOM query operations
 */
export interface IQueryOptions {
  /** Filter for visible/active elements only */
  onlyVisible?: boolean;
  /** Include elements within other matched elements */
  includeNested?: boolean;
}