import { TQueryOptions } from "../types.js";

/**
 * Selects all elements that match the CSS selector
 * @param selector CSS selector string to match elements against
 * @param target The root element or document to search within (default: document)
 * @param options Additional query configuration options
 * @returns NodeList of elements matching the selector
 * @throws {Error} If target is invalid or selector is not a string
 */
export function selectors<T extends NodeListOf<Element>>(
  selector: string,
  target: HTMLElement | Document = document,
  options: TQueryOptions = {}
): T {
  if (!target || typeof selector !== "string") {
    throw new Error("Invalid parameters");
  }

  let elements = target.querySelectorAll(selector) as T;

  if (options.onlyVisible) {
    elements = Array.from(elements)
      .filter(el => {
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden";
      }) as unknown as T;
  }

  if (options.includeNested === false) {
    elements = Array.from(elements)
      .filter(el => {
        const parent = el.parentElement?.closest(selector);
        return !parent;
      }) as unknown as T;
  }

  return elements;
}

/**
 * Selects the first element that matches the CSS selector
 * @param selector CSS selector string to match elements against
 * @param target The root element or document to search within (default: document)
 * @param options Additional query configuration options
 * @returns The first matching element or null if none found
 * @throws {Error} If target is invalid or selector is not a string
 */
export function selector<T extends HTMLElement>(
  selector: string,
  target: HTMLElement | Document = document,
  options: TQueryOptions = {}
): T | null {
  if (!target || typeof selector !== "string") {
    throw new Error("Invalid parameters");
  }

  if (options.onlyVisible) {
    const elements = selectors(selector, target, options);
    return elements[0] as T || null;
  }

  return target.querySelector(selector) as T | null;
}
