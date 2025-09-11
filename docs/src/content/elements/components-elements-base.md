---
category: Components
categoryId: 2
articleId: 1
slug: components-elements-base
title: Elementos Base
description: Documentação dos elementos base como Base, useRef e uniKey que servem como fundação para todos os outros componentes no @jay-js/elements.
---

# Referência de Componentes - @jay-js/elements

Este guia fornece documentação abrangente para todos os 21 componentes disponíveis no pacote `@jay-js/elements`. Cada componente oferece funcionalidades específicas com suporte completo ao TypeScript, gerenciamento de ciclo de vida e integração com Tailwind CSS.

---

## Elementos Base

### Base

**Propósito**: A função fundamental que serve como base para todos os outros componentes. Fornece funcionalidades essenciais como gerenciamento de ciclo de vida, manipulação de referências e suporte a filhos baseados em Promises.

**Assinatura TypeScript**:
```typescript
function Base<T extends TBaseTagMap = "div">(
  props?: TBase<T>
): HTMLElementTagNameMap[T]

type TBase<T extends TBaseTagMap> = {
  tag?: T;
  className?: string;
  listeners?: Listener;
  ref?: TRefObject<HTMLElement>;
  dataset?: Partial<DOMStringMap>;
  style?: TStyle;
  children?: TChildren;
  onmount?: (element: HTMLElement) => void;
  onunmount?: (element: HTMLElement) => void;
} & Omit<Partial<TBaseTagNameMap[T]>, "children" | "style" | "size">;
```

**Propriedades Principais**:
- `tag`: Especifica o tipo de elemento HTML a ser criado (padrão: "div")
- `className`: Classes CSS para aplicar ao elemento
- `children`: Conteúdo filho (suporta Promises para carregamento lazy)
- `onmount`: Callback executado quando o elemento é montado no DOM
- `onunmount`: Callback executado quando o elemento é removido do DOM
- `ref`: Referência para acesso direto ao elemento DOM
- `listeners`: Object com event listeners para o elemento
- `style`: Estilos CSS inline aplicados ao elemento
- `dataset`: Atributos data-* para o elemento

**Exemplo de Uso**:
```typescript
import { Base, useRef } from '@jay-js/elements';

// Elemento simples
const simpleDiv = Base({
  tag: 'div',
  className: 'container mx-auto',
  children: 'Conteúdo do elemento'
});

// Elemento com ciclo de vida
const elementRef = useRef<HTMLElement>();
const lifecycleElement = Base({
  tag: 'section',
  ref: elementRef,
  className: 'fade-in',
  onmount: (element) => {
    console.log('Elemento montado:', element);
    element.classList.add('mounted');
  },
  onunmount: (element) => {
    console.log('Elemento desmontado:', element);
    element.classList.remove('mounted');
  },
  children: 'Elemento com ciclo de vida'
});

// Elemento com filhos Promise (carregamento lazy)
const lazyElement = Base({
  tag: 'div',
  children: fetch('/api/content')
    .then(res => res.text())
    .then(content => content)
});
```

**Recursos Especiais**:
- **Gerenciamento de Ciclo de Vida**: Registra automaticamente elementos customizados quando callbacks de ciclo de vida são fornecidos
- **Suporte a Promises**: Filhos podem ser Promises para carregamento assíncrono
- **Sistema de Referência**: Permite acesso direto ao elemento DOM
- **Event Listeners**: Suporte tanto a handlers diretos quanto ao objeto `listeners`

---

### useRef

**Propósito**: Cria um objeto de referência mutável que persiste e permite acesso direto a elementos DOM.

**Assinatura TypeScript**:
```typescript
function useRef<T>(): TRefObject<T>

type TRefObject<T> = {
  current: T | null;
}
```

**Exemplo de Uso**:
```typescript
import { Base, useRef } from '@jay-js/elements';

const buttonRef = useRef<HTMLButtonElement>();

const myButton = Base({
  tag: 'button',
  ref: buttonRef,
  children: 'Clique em mim',
  onclick: () => {
    if (buttonRef.current) {
      buttonRef.current.style.backgroundColor = 'blue';
      buttonRef.current.textContent = 'Clicado!';
    }
  }
});

// Acesso posterior ao elemento
setTimeout(() => {
  if (buttonRef.current) {
    buttonRef.current.focus();
  }
}, 1000);
```

---

### uniKey

**Propósito**: Gera chaves únicas para elementos, usado internamente pelo sistema para IDs automáticos.

**Uso**: Utilizado automaticamente pelo sistema quando um ID não é fornecido explicitamente.

---