---
category: Core Concepts
categoryId: 3
articleId: 3
slug: core-concepts-lifecycle-management-custom-elements
title: Gerenciamento de Ciclo de Vida com Custom Elements
description: Implementação de onmount/onunmount com padrões web, registro de custom elements, connectedCallback e disconnectedCallback, e melhores práticas para gerenciamento de memória.
---



## 3. Gerenciamento de Ciclo de Vida com Custom Elements

### Como onmount/onunmount funcionam com padrões web

O sistema de lifecycle do @jay-js/elements utiliza os Web Components padrão para fornecer callbacks de montagem e desmontagem. Quando você especifica `onmount` ou `onunmount`, o sistema automaticamente:

1. **Registra um Custom Element**: Cria uma classe estendendo o elemento HTML nativo
2. **Associa callbacks**: Conecta seus callbacks aos métodos padrão do navegador
3. **Gerencia automaticamente**: O navegador chama os callbacks no momento apropriado

```typescript
const elemento = Base({
  tag: "div",
  onmount: (el) => {
    console.log("Elemento montado no DOM", el);
    // Inicialização, listeners externos, etc.
  },
  onunmount: (el) => {
    console.log("Elemento removido do DOM", el);
    // Cleanup, remoção de listeners, etc.
  }
});
```

### Registro de custom elements

O sistema de registro é automático e eficiente:

```typescript
// Função registerJayJsElement garante registro único
function registerJayJsElement<T extends TBaseTagMap>(tagName: T): void {
  if (!customElements.get(`jayjs-${tagName}`)) {
    const ElementClass = createJayJsElementClass(tagName);
    customElements.define(`jayjs-${tagName}`, ElementClass, { 
      extends: tagName 
    });
  }
}

// Classe gerada dinamicamente
class JayJsElement extends HTMLBaseElement {
  onmount?: (element: HTMLElement) => void;
  onunmount?: (element: HTMLElement) => void;

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
}
```

### connectedCallback e disconnectedCallback

Os callbacks utilizam os métodos nativos dos Web Components:

- **connectedCallback**: Executado quando o elemento é inserido no DOM
- **disconnectedCallback**: Executado quando o elemento é removido do DOM

```typescript
// Exemplo prático de lifecycle
const timer = Base({
  tag: "div",
  children: "Timer: 0s",
  onmount: (el) => {
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      el.textContent = `Timer: ${seconds}s`;
    }, 1000);
    
    // Armazenar referência para cleanup
    el.dataset.intervalId = interval.toString();
  },
  onunmount: (el) => {
    // Cleanup essencial para evitar vazamentos de memória
    const intervalId = parseInt(el.dataset.intervalId || "0");
    clearInterval(intervalId);
  }
});
```

### Melhores práticas para cleanup e gerenciamento de memória

```typescript
// ✅ BOM: Cleanup completo
const componenteComplexo = Base({
  onmount: (el) => {
    // Event listeners externos
    const handleResize = () => updateSize(el);
    window.addEventListener("resize", handleResize);
    
    // Timers
    const timer = setTimeout(() => fadeIn(el), 100);
    
    // Observers
    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(el);
    
    // Armazenar referências para cleanup
    el._jayjs_cleanup = {
      resizeListener: handleResize,
      timer,
      observer
    };
  },
  onunmount: (el) => {
    const cleanup = el._jayjs_cleanup;
    if (cleanup) {
      // Remover listeners
      window.removeEventListener("resize", cleanup.resizeListener);
      
      // Limpar timers
      clearTimeout(cleanup.timer);
      
      // Desconectar observers
      cleanup.observer.disconnect();
      
      // Limpar referência
      delete el._jayjs_cleanup;
    }
  }
});

// ❌ RUIM: Sem cleanup adequado
const componenteProblematico = Base({
  onmount: (el) => {
    // Event listeners não removidos = vazamento de memória
    window.addEventListener("resize", () => updateSize(el));
    
    // Timer não limpo = continua executando após remoção
    setInterval(() => animate(el), 16);
  }
  // onunmount ausente = problemas garantidos
});
```