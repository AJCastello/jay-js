/**
 * Selects all elements matching the specified CSS selector within the target element (or the entire document if no target is provided).
 *
 * @param selector - A string containing one or more comma-separated CSS selectors.
 * @param target - The HTML element or Document within which to search. If not provided, defaults to the entire document.
 * @returns A NodeList of found elements. Returns an empty NodeList if no elements match the selector.
 */
export function selectors<T extends NodeListOf<Element>>(
  selector: string,
  target: HTMLElement | Document = document
): T {
  if (!target || typeof selector !== 'string') {
    throw new Error('Invalid parameters');
  }
  return target.querySelectorAll(selector) as T;
}

/**
 * Selects the first element matching the specified CSS selector within the target element (or the entire document if no target is provided).
 *
 * @param selector - A string containing a valid CSS selector.
 * @param target - The HTML element or Document within which to search. If not provided, defaults to the entire document.
 * @returns The first element found that matches the selector, or null if no elements match.
 */
export function selector<T extends HTMLElement>(
  selector: string,
  target: HTMLElement | Document = document
): T | null {
  if (!target || typeof selector !== 'string') {
    throw new Error('Invalid parameters');
  }
  return target.querySelector(selector) as T | null;
}
