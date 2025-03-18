import { RenderContent, RenderOptions, RenderTarget } from "../types.js";
import { selector } from "./query.js";

/**
 * Renderiza conteúdo em um elemento alvo
 */
export function render(
  target: RenderTarget,
  content: RenderContent,
  options: RenderOptions = {}
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

/**
 * Cria um elemento HTML com atributos e conteúdo
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes: Record<string, string> = {},
  content?: RenderContent
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  if (content) {
    render(element, content);
  }

  return element;
}

/**
 * Remove todos os filhos de um elemento
 */
export function clearElement(element: HTMLElement): void {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Substitui um elemento por outro
 */
export function replaceElement(
  oldElement: HTMLElement,
  newElement: HTMLElement | DocumentFragment
): void {
  if (!oldElement.parentNode) return;
  oldElement.parentNode.replaceChild(newElement, oldElement);
}