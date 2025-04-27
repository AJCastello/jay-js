import { TBaseTagMap } from "./Base.types";

export function createJayJsElementClass<T extends TBaseTagMap>(tagName: T): new () => HTMLElement {
  if (!/^[a-z][a-z0-9-]*$/.test(tagName)) {
    throw new Error(`Nome de elemento inválido: ${tagName}`);
  }

  const baseElement = document.createElement(tagName);
  const BaseClass = baseElement.constructor as { new(): HTMLElement };

  class JayJsElement extends BaseClass {
    onmount?: (element: HTMLElement) => void;
    onunmount?: (element: HTMLElement) => void;

    constructor() {
      super();
    }

    connectedCallback() {
      if (typeof this.onmount === "function") {
        this.onmount(this);
      }
    }

    disconnectedCallback() {
      if (typeof this.onunmount === "function") {
        this.onunmount(this);
      }
    }
  };

  return JayJsElement;
}

export function registerJayJsElement<T extends TBaseTagMap>(tagName: T): void {
  if (!customElements.get(`jayjs-${tagName}`)) {
    const ElementClass = createJayJsElementClass(tagName);
    customElements.define(`jayjs-${tagName}`, ElementClass, { extends: tagName });
  }
}

