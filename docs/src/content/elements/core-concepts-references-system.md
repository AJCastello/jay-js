---
category: Core Concepts
categoryId: 3
articleId: 6
slug: core-concepts-references-system
title: Sistema de Referências
description: API useRef e padrões de uso, acesso direto ao DOM, integração com eventos de lifecycle e melhores práticas para utilização de referências.
---



## 6. Sistema de Referências

### API useRef e padrões de uso

O sistema `useRef` fornece acesso direto ao DOM quando necessário:

```typescript
// Criação de referência tipada
const elementRef = useRef<HTMLDivElement>();

// Elemento com referência
const elemento = Base({
  tag: "div",
  ref: elementRef,
  children: "Conteúdo"
});

// Uso da referência
useEffect(() => {
  if (elementRef.current) {
    // Acesso direto às APIs nativas do DOM
    elementRef.current.scrollIntoView();
    elementRef.current.getBoundingClientRect();
    elementRef.current.animate([...], { duration: 1000 });
  }
});
```

### Acesso direto ao DOM quando necessário

Cenários onde refs são apropriadas:

#### 1. Manipulação de foco
```typescript
const inputRef = useRef<HTMLInputElement>();

const FormularioLogin = () => {
  const input = Input({
    ref: inputRef,
    type: "email",
    placeholder: "Email"
  });
  
  const button = Button({
    children: "Focar Input",
    onclick: () => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  });
  
  return Base({
    tag: "form",
    children: [input, button]
  });
};
```

#### 2. Medições e posicionamento
```typescript
const containerRef = useRef<HTMLDivElement>();

const ComponenteMedido = () => {
  return Base({
    tag: "div",
    ref: containerRef,
    onmount: () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        console.log("Dimensões:", rect.width, rect.height);
        
        // Posicionamento dinâmico baseado nas dimensões
        if (rect.width < 300) {
          containerRef.current.classList.add("layout-compact");
        }
      }
    }
  });
};
```

#### 3. APIs de animação nativa
```typescript
const animatedRef = useRef<HTMLDivElement>();

const ComponenteAnimado = () => {
  return Base({
    tag: "div",
    ref: animatedRef,
    className: "animatable",
    onclick: () => {
      if (animatedRef.current) {
        // Usar Web Animations API
        animatedRef.current.animate([
          { transform: "scale(1)" },
          { transform: "scale(1.1)" },
          { transform: "scale(1)" }
        ], {
          duration: 200,
          easing: "ease-out"
        });
      }
    }
  });
};
```

### Integração com eventos de lifecycle

```typescript
const complexRef = useRef<HTMLDivElement>();

const ComponenteComplexo = () => {
  return Base({
    tag: "div",
    ref: complexRef,
    onmount: (el) => {
      // Ref já está disponível em onmount
      console.log("Elemento:", el);
      console.log("Via ref:", complexRef.current);
      console.log("São o mesmo:", el === complexRef.current); // true
      
      // Configuração inicial usando ref
      if (complexRef.current) {
        setupComplexBehavior(complexRef.current);
      }
    },
    onunmount: (el) => {
      // Cleanup usando ref
      if (complexRef.current) {
        cleanupComplexBehavior(complexRef.current);
      }
    }
  });
};
```

### Melhores práticas vs quando evitar refs

#### ✅ Use refs quando:

1. **Foco de elementos**
```typescript
const inputRef = useRef<HTMLInputElement>();
// inputRef.current?.focus()
```

2. **Medições do DOM**
```typescript
const containerRef = useRef<HTMLDivElement>();
// containerRef.current?.getBoundingClientRect()
```

3. **APIs de animação nativa**
```typescript
const animRef = useRef<HTMLElement>();
// animRef.current?.animate(...)
```

4. **Scroll programático**
```typescript
const scrollRef = useRef<HTMLDivElement>();
// scrollRef.current?.scrollIntoView()
```

5. **Integração com bibliotecas de terceiros**
```typescript
const chartRef = useRef<HTMLCanvasElement>();
// new Chart(chartRef.current, config)
```

#### ❌ Evite refs quando:

1. **Manipulação de conteúdo** (use children)
```typescript
// ❌ RUIM
const badRef = useRef<HTMLDivElement>();
badRef.current!.innerHTML = "novo conteúdo";

// ✅ BOM  
const element = Base({
  children: "novo conteúdo"
});
```

2. **Modificação de estilos** (use className ou style)
```typescript
// ❌ RUIM
elementRef.current!.style.display = "none";

// ✅ BOM
const element = Base({
  style: { display: "none" }
});
```

3. **Event listeners** (use listeners ou propriedades de evento)
```typescript
// ❌ RUIM
elementRef.current!.addEventListener("click", handler);

// ✅ BOM
const element = Base({
  onclick: handler
});
```