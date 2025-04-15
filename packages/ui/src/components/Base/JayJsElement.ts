import { TBaseTagMap } from "./Base.types";

// Factory function para criar e registrar elementos customizados
export function createJayJsElementClass<T extends TBaseTagMap>(tagName: T): new () => HTMLElement {
  // Verifica se o nome do elemento é válido
  if (!/^[a-z][a-z0-9-]*$/.test(tagName)) {
    throw new Error(`Nome de elemento inválido: ${tagName}`);
  }

  // Determinamos o construtor apropriado para o elemento HTML nativo
  const baseElement = document.createElement(tagName);
  const BaseClass = baseElement.constructor as { new(): HTMLElement };

  // Definir a classe para este tipo de elemento
  class JayJsElement extends BaseClass {
    // Define properties for lifecycle callbacks
    onmount?: (element: HTMLElement) => void;
    onunmount?: (element: HTMLElement) => void;

    constructor() {
      super();
    }

    connectedCallback() {
      console.log(`Elemento ${tagName} conectado ao DOM`);
      if (typeof this.onmount === "function") {
        this.onmount(this);
      }
    }

    disconnectedCallback() {
      console.log(`Elemento ${tagName} removido do DOM`);
      if (typeof this.onunmount === "function") {
        this.onunmount(this);
      }
    }
  };

  return JayJsElement;
}

// Função para registrar um elemento customizado dinamicamente
export function registerJayJsElement<T extends TBaseTagMap>(tagName: T): void {
  if (!customElements.get(`jayjs-${tagName}`)) {
    const ElementClass = createJayJsElementClass(tagName);
    customElements.define(`jayjs-${tagName}`, ElementClass, { extends: tagName });
  }
}

