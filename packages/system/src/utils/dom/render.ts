import { TRenderContent, IRenderOptions, TRenderTarget } from "../types.js";
import { selector } from "./query.js";

/**
 * Renders content into a target element in the DOM
 * @param target - Element or selector to render content into
 * @param content - Content to render (can be Node, string, HTMLElement, or array)
 * @param options - Optional rendering configuration
 * 
 * @example
 * ```ts
 * render('#app', 'Hello'); // Replaces content
 * render(element, 'World', { insert: 'append' }); // Appends content
 * render('#app', [el1, el2], { insert: 'prepend' }); // Prepends multiple elements
 * ```
 */
export function render(
  target: TRenderTarget,
  content: TRenderContent,
  options: IRenderOptions = {}
): void {
  if (!target || !content) return;
  
  const element = typeof target === "string" ? selector(target) : target;
  if (!element) return;

  if (!options.insert) {
    element.innerHTML = "";
  }
  
  if (Array.isArray(content)) {
    if (options.insert === "prepend") {
      element.prepend(...content);
    } else {
      element.append(...content);
    }
    return;
  }

  if (options.insert === "prepend") {
    element.prepend(content);
  } else {
    element.append(content);
  }
}