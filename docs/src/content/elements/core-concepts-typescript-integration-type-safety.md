---
category: Core Concepts
categoryId: 3
articleId: 5
slug: core-concepts-typescript-integration-type-safety
title: Integração com TypeScript e Type Safety
description: Funções de componente genéricos, herança de propriedades de elementos HTML, tipagem de event handlers e referências, e tipos customizados para extensibilidade.
---



## 5. Integração com TypeScript e Type Safety

### Funções de componente genéricos

O sistema de tipos do @jay-js/elements fornece type safety completo mantendo flexibilidade:

```typescript
// Função genérica permite especialização de elementos
export function Button<T extends TBaseTagMap = "button">(
  props: TButton<T> = { tag: "button" }
): HTMLElementTagNameMap[T] {
  return Base({
    ...props,
    tag: "button",
  }) as HTMLElementTagNameMap[T];
}

// Uso com type safety completo
const botaoHTML: HTMLButtonElement = Button({
  onclick: (e) => {
    // 'e' é automaticamente tipado como MouseEvent
    // 'e.target' é automaticamente HTMLButtonElement
    console.log(e.target.disabled);
  }
});

// Especialização para outros elementos
const linkButton: HTMLAnchorElement = Button<"a">({
  tag: "a",
  href: "/destino",
  // Propriedades específicas de <a> disponíveis
  target: "_blank",
  rel: "noopener"
});
```

### Herança de propriedades de elementos HTML

O sistema de tipos preserva todas as propriedades nativas dos elementos HTML:

```typescript
// Definição base que herda propriedades nativas
export type TBaseElement<T extends TBaseTagMap> = {
  // Propriedades específicas do Jay JS
  tag?: T;
  className?: string;
  listeners?: Listener;
  ref?: TRefObject<HTMLElement>;
  children?: TChildren;
  onmount?: (element: HTMLElement) => void;
  onunmount?: (element: HTMLElement) => void;
} & Omit<Partial<HTMLElementTagNameMap[T]>, "children" | "style">;

// Exemplo prático com Input
const input = Input({
  // Propriedades nativas do HTMLInputElement
  type: "email",
  placeholder: "Digite seu email",
  required: true,
  maxLength: 100,
  pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
  
  // Propriedades específicas do Jay JS
  className: "form-input",
  onmount: (el) => el.focus(),
  
  // Event handlers tipados
  oninput: (e) => {
    // e.target é automaticamente HTMLInputElement
    const isValid = e.target.validity.valid;
    e.target.classList.toggle("invalid", !isValid);
  }
});
```

### Tipagem de event handlers

O sistema preserva a tipagem completa dos event handlers:

```typescript
// Listeners tipados automaticamente
const elemento = Base({
  tag: "input",
  
  // Eventos diretos com tipagem automática
  oninput: (e: Event & { target: HTMLInputElement }) => {
    // TypeScript conhece todas as propriedades
    console.log(e.target.value, e.target.selectionStart);
  },
  
  onkeydown: (e: KeyboardEvent) => {
    // Propriedades específicas do teclado disponíveis
    if (e.key === "Enter" && e.ctrlKey) {
      submitForm();
    }
  },
  
  // Objeto listeners com tipagem completa
  listeners: {
    focus: (e) => {
      // e é automaticamente FocusEvent
      e.target.classList.add("focused");
    },
    
    blur: (e) => {
      // e é automaticamente FocusEvent  
      e.target.classList.remove("focused");
    },
    
    change: (e) => {
      // e é automaticamente Event com target tipado
      validateInput(e.target as HTMLInputElement);
    }
  }
});
```

### Tipagem de referências com useRef

```typescript
// Ref tipada para elemento específico
const inputRef = useRef<HTMLInputElement>();

const input = Input({
  ref: inputRef,
  type: "text"
});

// Uso da referência com type safety
setTimeout(() => {
  if (inputRef.current) {
    // TypeScript conhece que é HTMLInputElement
    inputRef.current.focus();
    inputRef.current.select();
    
    // Propriedades específicas disponíveis
    console.log(inputRef.current.value);
    console.log(inputRef.current.validity.valid);
  }
}, 1000);
```

### Tipos customizados para extensibilidade

```typescript
// Definição de tipos para elemento customizado
interface TMinhaExtensao<T extends TBaseTagMap> extends TBase<T> {
  // Propriedades customizadas
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  loading?: boolean;
}

// Função que usa os tipos customizados
function MeuComponente<T extends TBaseTagMap = "div">(
  props: TMinhaExtensao<T>
): HTMLElementTagNameMap[T] {
  const { variant, size, loading, ...baseProps } = props;
  
  // Lógica baseada nas propriedades customizadas
  const classes = [
    variant && `variant-${variant}`,
    size && `size-${size}`,
    loading && "loading"
  ].filter(Boolean).join(" ");
  
  return Base({
    ...baseProps,
    className: `${classes} ${baseProps.className || ""}`.trim()
  });
}

// Uso com type safety completo
const meuEl: HTMLDivElement = MeuComponente({
  variant: "primary",    // ✅ Válido
  size: "large",         // ✅ Válido  
  // variant: "invalid", // ❌ Erro de TypeScript
  loading: true,
  children: "Conteúdo",
  onclick: (e) => {      // Event handler tipado
    console.log(e.target);
  }
});
```