import { QueryOptions } from "../types.js";

/**
 * Seleciona todos os elementos que correspondem ao seletor CSS
 */
export function selectors<T extends NodeListOf<Element>>(
  selector: string,
  target: HTMLElement | Document = document,
  options: QueryOptions = {}
): T {
  if (!target || typeof selector !== 'string') {
    throw new Error('Invalid parameters');
  }

  let elements = target.querySelectorAll(selector) as T;

  if (options.onlyVisible) {
    elements = Array.from(elements)
      .filter(el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
      }) as unknown as T;
  }

  if (!options.includeNested) {
    elements = Array.from(elements)
      .filter(el => {
        const parent = el.parentElement;
        return !parent || !parent.matches(selector);
      }) as unknown as T;
  }

  return elements;
}

/**
 * Seleciona o primeiro elemento que corresponde ao seletor CSS
 */
export function selector<T extends HTMLElement>(
  selector: string,
  target: HTMLElement | Document = document,
  options: QueryOptions = {}
): T | null {
  if (!target || typeof selector !== 'string') {
    throw new Error('Invalid parameters');
  }

  if (options.onlyVisible) {
    const elements = selectors(selector, target, options);
    return elements[0] as T || null;
  }

  return target.querySelector(selector) as T | null;
}

/**
 * Encontra o elemento pai mais próximo que corresponde ao seletor
 */
export function closest<T extends HTMLElement>(
  element: HTMLElement,
  selector: string
): T | null {
  return element.closest(selector) as T | null;
}

/**
 * Verifica se um elemento corresponde a um seletor
 */
export function matches(
  element: HTMLElement,
  selector: string
): boolean {
  return element.matches(selector);
}