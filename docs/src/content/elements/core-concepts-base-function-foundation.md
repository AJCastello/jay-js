---
category: Core Concepts
categoryId: 2
articleId: 2
slug: core-concepts-base-function-foundation
title: A Função Base como Fundação
description: Como a função Base funciona como bloco de construção central, processo de criação e configuração de propriedades, manipulação de eventos e gerenciamento de estilos.
---



## 2. A Função Base como Fundação

### Como Base serve como bloco de construção central

A função `Base` é o coração arquitetural do pacote. Ela implementa toda a lógica fundamental de criação e configuração de elementos HTML, fornecendo uma API consistente para todos os elementos específicos.

```typescript
// Arquitetura simplificada da função Base
function Base<T extends TBaseTagMap = "div">({
  tag,           // Tipo do elemento HTML
  ref,           // Referência direta ao DOM
  style,         // Estilos inline
  children,      // Conteúdo (incluindo Promises)
  className,     // Classes CSS
  listeners,     // Event listeners
  onmount,       // Callback de montagem
  onunmount,     // Callback de desmontagem
  ...props       // Propriedades nativas do elemento
}: TBase<T>): HTMLElementTagNameMap[T]
```

### Processo de criação e configuração de propriedades

O Base segue um fluxo específico de criação que garante inicialização adequada:

```typescript
// 1. Detecção de necessidade de lifecycle
const hasLifecycle = Boolean(onmount || onunmount);

// 2. Registro de custom element se necessário
if (hasLifecycle) {
  registerJayJsElement(tag || "div");
}

// 3. Criação do elemento com ou sem custom element
const element = document.createElement(
  tag || "div", 
  hasLifecycle ? { is: `jayjs-${tag || "div"}` } : undefined
);

// 4. Configuração de lifecycle callbacks
if (hasLifecycle) {
  element.onmount = onmount;
  element.onunmount = onunmount;
}

// 5. Atribuição de referência
ref && (ref.current = element);

// 6. Configuração de propriedades nativas
Object.entries(props).forEach(([key, value]) => {
  element[key] = value;
});
```

### Padrões de manipulação de eventos

O Base oferece duas abordagens para manipulação de eventos:

#### Propriedades diretas (recomendado para eventos simples)
```typescript
const input = Input({
  oninput: (event) => {
    console.log(event.target.value);
  },
  onfocus: () => console.log("Focado"),
  onblur: () => console.log("Desfocado")
});
```

#### Objeto listeners (recomendado para cenários complexos)
```typescript
const elemento = Base({
  tag: "div",
  listeners: {
    mouseenter: (e) => e.target.classList.add("hover"),
    mouseleave: (e) => e.target.classList.remove("hover"),
    click: handleComplexClick,
    keydown: handleKeyboardNavigation
  }
});
```

### Gerenciamento de estilos e classes

```typescript
// Estilos inline
const elemento = Base({
  style: {
    backgroundColor: "red",
    transform: "rotate(45deg)",
    transition: "all 0.3s ease"
  }
});

// Classes CSS (string ou função reativa)
const elemento = Base({
  className: "flex items-center justify-between p-4"
});

// Suporte a dataset para data attributes
const elemento = Base({
  dataset: {
    testid: "meu-componente",
    value: "123",
    config: JSON.stringify({ active: true })
  }
});
```