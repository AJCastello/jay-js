---
category: Elements
categoryId: 1
articleId: 3
slug: elements-core-concepts
title: Conceitos Fundamentais
description: Arquitetura headless, função Base, lifecycle management com Custom Elements, Promise-based children e sistema de tipos do @jay-js/elements.
---

# Conceitos Fundamentais do @jay-js/elements

O pacote `@jay-js/elements` implementa uma abordagem única para criação de elementos HTML com funcionalidades avançadas mantendo compatibilidade total com os padrões web. Esta documentação explora os conceitos arquiteturais que tornam este pacote poderoso e flexível.

## 1. Filosofia de Design Headless

### O que significa Headless neste contexto

O design "headless" do @jay-js/elements separa completamente a **funcionalidade** da **apresentação visual**. Diferentemente de bibliotecas de componentes tradicionais que vêm com estilos pré-definidos, nossos elementos fornecem apenas a estrutura e o comportamento, deixando o styling completamente nas mãos do desenvolvedor.

```typescript
// Elemento com funcionalidade completa, sem estilos impostos
const botao = Button({
  children: "Clique aqui",
  onclick: () => console.log("Clicado!"),
  // Você define completamente o visual
  className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
});
```

### Benefícios da separação funcionalidade/styling

1. **Flexibilidade Máxima**: Cada projeto pode implementar seu próprio sistema de design
2. **Zero Conflitos**: Não há estilos para sobrescrever ou conflitos com CSS existente
3. **Performance**: Sem CSS desnecessário sendo carregado
4. **Compatibilidade**: Funciona com qualquer framework CSS (Tailwind, Bootstrap, etc.)
5. **Customização Ilimitada**: Desde elementos minimalistas até componentes complexos

### Exemplo prático da flexibilidade

```typescript
// Mesmo elemento, designs completamente diferentes
const botaoMinimalista = Button({
  children: "Simples",
  className: "border border-gray-300 px-2 py-1"
});

const botaoComplexo = Button({
  children: "Avançado",
  className: `
    relative overflow-hidden
    bg-gradient-to-r from-purple-500 to-blue-500
    text-white font-semibold py-3 px-6
    rounded-full shadow-lg
    transform transition-all duration-200
    hover:scale-105 hover:shadow-xl
    active:scale-95
  `
});
```

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

## 4. Sistema de Children Baseado em Promises

### Como o carregamento assíncrono de conteúdo funciona

O @jay-js/elements possui suporte nativo para conteúdo assíncrono através de Promises. Quando você passa uma Promise como child, o sistema:

1. **Cria um placeholder**: Insere `<jayjs-lazy-slot>` temporariamente
2. **Aguarda resolução**: Monitora a Promise em background
3. **Substitui conteúdo**: Troca o placeholder pelo conteúdo real quando disponível
4. **Trata erros**: Captura e loga erros automaticamente

```typescript
// Children síncronos tradicionais
const elementoSimples = Base({
  children: "Texto imediato"
});

// Children assíncronos com Promise
const elementoAssincrono = Base({
  children: fetch("/api/dados")
    .then(response => response.text())
    .then(texto => documento.createTextNode(texto))
});
```

### Exemplos com fetch, timeouts, renderização condicional

#### Carregamento de dados externos
```typescript
async function criarListaProdutos() {
  return Base({
    tag: "ul",
    className: "lista-produtos",
    children: fetch("/api/produtos")
      .then(response => response.json())
      .then(produtos => {
        // Criar elementos da lista dinamicamente
        return produtos.map(produto => Base({
          tag: "li",
          className: "produto-item",
          children: [
            Base({ tag: "h3", children: produto.nome }),
            Base({ tag: "p", children: produto.descricao }),
            Base({ 
              tag: "span", 
              className: "preco",
              children: `R$ ${produto.preco}` 
            })
          ]
        }));
      })
  });
}
```

#### Delays e animações
```typescript
const elementoComDelay = Base({
  tag: "div",
  className: "container",
  children: [
    "Carregando",
    // Conteúdo aparece após 2 segundos
    new Promise(resolve => 
      setTimeout(() => {
        resolve(Base({
          tag: "p",
          className: "conteudo-carregado fade-in",
          children: "Conteúdo carregado com sucesso!"
        }));
      }, 2000)
    )
  ]
});
```

#### Renderização condicional baseada em estado
```typescript
function criarElementoCondicional(usuarioLogado: boolean) {
  return Base({
    tag: "header",
    children: [
      Base({ tag: "h1", children: "Minha App" }),
      // Conteúdo condicional assíncrono
      Promise.resolve(usuarioLogado).then(logado => 
        logado 
          ? Base({ 
              tag: "nav", 
              children: "Menu do usuário" 
            })
          : Base({ 
              tag: "div", 
              children: "Faça login" 
            })
      )
    ]
  });
}
```

### Conteúdo misto (strings, nodes, promises)

O sistema suporta qualquer combinação de tipos de children:

```typescript
const elementoMisto = Base({
  tag: "article",
  children: [
    // String
    "Início do artigo",
    
    // Node síncrono
    Base({ tag: "h2", children: "Seção 1" }),
    
    // Promise de string
    fetch("/api/introducao").then(r => r.text()),
    
    // Promise de Node
    carregarImagem("/imagem.jpg").then(img => img),
    
    // Array misto
    [
      "Mais texto",
      Base({ tag: "p", children: "Parágrafo" }),
      Promise.resolve("Texto assíncrono")
    ],
    
    // String final
    "Fim do artigo"
  ]
});
```

### Estados de carregamento e tratamento de erros

#### Implementação de loading states
```typescript
function criarElementoComLoading() {
  let loadingElement: HTMLElement;
  
  return Base({
    tag: "div",
    className: "container",
    onmount: (el) => {
      // Criar indicador de loading
      loadingElement = Base({
        tag: "div",
        className: "loading-spinner",
        children: "Carregando..."
      });
      el.appendChild(loadingElement);
    },
    children: fetch("/api/dados")
      .then(response => {
        // Remover loading
        if (loadingElement) {
          loadingElement.remove();
        }
        return response.text();
      })
      .then(dados => Base({
        tag: "div",
        className: "dados-carregados",
        children: dados
      }))
      .catch(erro => {
        // Remover loading em caso de erro
        if (loadingElement) {
          loadingElement.remove();
        }
        return Base({
          tag: "div",
          className: "erro",
          children: `Erro ao carregar: ${erro.message}`
        });
      })
  });
}
```

#### Tratamento robusto de erros
```typescript
// Sistema interno de tratamento de erros
function appendChildToBase(base: HTMLElement, child: Promise<Node>) {
  const elementSlot = document.createElement("jayjs-lazy-slot");
  base.appendChild(elementSlot);
  
  child
    .then((resolvedChild) => {
      if (resolvedChild && typeof resolvedChild !== "boolean") {
        elementSlot.replaceWith(resolvedChild);
      } else {
        // Remover slot se não há conteúdo válido
        elementSlot.remove();
      }
    })
    .catch((error) => {
      console.error("Failed to resolve child promise:", error);
      
      // Substituir por indicador de erro em desenvolvimento
      if (process.env.NODE_ENV === "development") {
        const errorElement = document.createElement("div");
        errorElement.style.cssText = "color: red; border: 1px solid red; padding: 8px;";
        errorElement.textContent = `Erro: ${error.message}`;
        elementSlot.replaceWith(errorElement);
      } else {
        // Apenas remover slot em produção
        elementSlot.remove();
      }
    });
}
```

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

## 7. Padrões de Manipulação de Eventos

### Propriedades de evento diretas

A abordagem mais simples e recomendada para a maioria dos casos:

```typescript
const button = Button({
  // Eventos de mouse
  onclick: (e) => console.log("Clique", e),
  onmouseenter: (e) => e.target.classList.add("hover"),
  onmouseleave: (e) => e.target.classList.remove("hover"),
  
  // Eventos de teclado  
  onkeydown: (e) => {
    if (e.key === "Enter") {
      e.target.click();
    }
  }
});

const input = Input({
  // Eventos de formulário
  oninput: (e) => validateInput(e.target.value),
  onchange: (e) => saveValue(e.target.value),
  onfocus: (e) => e.target.classList.add("focused"),
  onblur: (e) => e.target.classList.remove("focused")
});
```

### Objeto listeners para cenários complexos

Para casos onde você precisa de maior controle ou múltiplos listeners do mesmo tipo:

```typescript
const elementoComplexo = Base({
  tag: "div",
  listeners: {
    // Múltiplos listeners podem ser necessários via addEventListener
    click: handleMainClick,
    
    mouseenter: (e) => {
      // Lógica de hover
      e.target.classList.add("hover");
      showTooltip(e.target);
    },
    
    mouseleave: (e) => {
      e.target.classList.remove("hover");
      hideTooltip(e.target);
    },
    
    keydown: (e) => {
      // Navegação por teclado
      switch(e.key) {
        case "ArrowUp":
          navigateUp();
          e.preventDefault();
          break;
        case "ArrowDown":
          navigateDown();
          e.preventDefault();
          break;
        case "Escape":
          closeModal();
          break;
      }
    },
    
    // Eventos customizados
    "custom:updated": (e) => {
      console.log("Dados atualizados:", e.detail);
    }
  }
});
```

### Event delegation e performance

Para listas grandes ou elementos dinâmicos, use event delegation:

```typescript
// ❌ RUIM: Event listener para cada item
function criarListaIneficiente(items: string[]) {
  return Base({
    tag: "ul",
    children: items.map(item => Base({
      tag: "li",
      children: item,
      onclick: () => console.log("Clicou em", item) // Muitos listeners!
    }))
  });
}

// ✅ BOM: Um listener no container
function criarListaEficiente(items: string[]) {
  return Base({
    tag: "ul",
    listeners: {
      click: (e) => {
        const li = e.target.closest("li");
        if (li) {
          const index = Array.from(li.parentElement!.children).indexOf(li);
          const item = items[index];
          console.log("Clicou em", item);
        }
      }
    },
    children: items.map((item, index) => Base({
      tag: "li",
      children: item,
      dataset: { index: index.toString() } // Para facilitar identificação
    }))
  });
}
```

### Manipulação de eventos customizados

O sistema suporta completamente eventos customizados:

```typescript
// Disparar eventos customizados
const publisher = Base({
  tag: "div",
  onclick: () => {
    // Criar e disparar evento customizado
    const customEvent = new CustomEvent("data:changed", {
      detail: { 
        timestamp: Date.now(),
        data: "novos dados" 
      },
      bubbles: true
    });
    publisher.dispatchEvent(customEvent);
  }
});

// Escutar eventos customizados
const subscriber = Base({
  tag: "div",
  listeners: {
    "data:changed": (e) => {
      console.log("Dados mudaram:", e.detail);
      updateDisplay(e.detail.data);
    }
  }
});

// Sistema de comunicação entre componentes
class EventBus extends EventTarget {
  emit(type: string, detail?: any) {
    this.dispatchEvent(new CustomEvent(type, { detail }));
  }
  
  on(type: string, callback: (e: CustomEvent) => void) {
    this.addEventListener(type, callback as EventListener);
  }
}

const eventBus = new EventBus();

// Componente que emite
const emitter = Button({
  children: "Enviar Dados",
  onclick: () => {
    eventBus.emit("user:action", { action: "submit", data: "..." });
  }
});

// Componente que recebe
const receiver = Base({
  tag: "div",
  onmount: () => {
    eventBus.on("user:action", (e) => {
      console.log("Ação do usuário:", e.detail);
    });
  }
});
```

### Padrões avançados de eventos

#### Debounce e throttle
```typescript
function debounce(func: Function, delay: number) {
  let timeoutId: number;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

const searchInput = Input({
  type: "search",
  placeholder: "Buscar...",
  oninput: debounce((e: Event) => {
    const query = (e.target as HTMLInputElement).value;
    performSearch(query);
  }, 300)
});
```

#### Event composition
```typescript
function criarDragDrop() {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  
  return Base({
    tag: "div",
    className: "draggable",
    listeners: {
      mousedown: (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        e.target.classList.add("dragging");
      },
      
      mousemove: (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        e.target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      },
      
      mouseup: (e) => {
        if (isDragging) {
          isDragging = false;
          e.target.classList.remove("dragging");
          
          // Emitir evento customizado de conclusão
          const dropEvent = new CustomEvent("drag:complete", {
            detail: {
              element: e.target,
              finalX: e.clientX,
              finalY: e.clientY
            }
          });
          e.target.dispatchEvent(dropEvent);
        }
      }
    }
  });
}
```

## 8. Considerações de Performance

### Impacto de zero dependências

O @jay-js/elements foi projetado com performance em mente:

```
Bundle Size Comparison:
- @jay-js/elements: ~15KB (minified + gzipped)
- React + ReactDOM: ~130KB (minified + gzipped)  
- Vue 3: ~40KB (minified + gzipped)
- Angular Elements: ~80KB+ (minified + gzipped)

Memory Footprint:
- Zero virtual DOM overhead
- Direto ao DOM nativo
- Garbage collection mais eficiente
- Menos abstrações = menos memória
```

### Manipulação nativa do DOM

Todas as operações utilizam APIs nativas otimizadas pelos navegadores:

```typescript
// Performance nativa do navegador
const lista = Base({
  tag: "ul",
  children: dados.map(item => Base({
    tag: "li",
    children: item.nome
  }))
});

// Comparado com frameworks que fazem:
// Virtual DOM diff -> Reconciliation -> DOM updates
// @jay-js/elements faz:
// Direct DOM creation -> Immediate insertion
```

### Padrões de re-renderização eficiente

#### ✅ Padrões eficientes

1. **Atualizações granulares**
```typescript
const contador = (() => {
  let valor = 0;
  const display = Base({
    tag: "span",
    children: valor.toString()
  });
  
  return {
    elemento: Base({
      tag: "div",
      children: [
        display,
        Button({
          children: "+",
          onclick: () => {
            valor++;
            // Atualização direta, sem re-render completo
            display.textContent = valor.toString();
          }
        })
      ]
    })
  };
})();
```

2. **Lazy loading de seções grandes**
```typescript
const secaoGrande = Base({
  tag: "section",
  children: [
    Base({ tag: "h2", children: "Conteúdo Principal" }),
    
    // Seção pesada carregada sob demanda
    new Promise(resolve => {
      // Só carregar quando necessário
      requestIdleCallback(() => {
        resolve(criarSecaoPesada());
      });
    })
  ]
});
```

3. **Reutilização de elementos**
```typescript
const cache = new Map<string, HTMLElement>();

function criarElementoCacheado(tipo: string, conteudo: string) {
  const chave = `${tipo}-${conteudo}`;
  
  if (cache.has(chave)) {
    // Clonar elemento existente ao invés de recriar
    return cache.get(chave)!.cloneNode(true) as HTMLElement;
  }
  
  const elemento = Base({
    tag: tipo as TBaseTagMap,
    children: conteudo
  });
  
  cache.set(chave, elemento);
  return elemento;
}
```

#### ❌ Padrões ineficientes

1. **Re-criação desnecessária**
```typescript
// ❌ RUIM: Recria tudo a cada atualização
function listaIneficiente(items: string[]) {
  return Base({
    tag: "ul",
    children: items.map(item => Base({
      tag: "li",
      children: item
    }))
  });
}

// ✅ BOM: Atualização granular
class ListaEficiente {
  private container: HTMLUListElement;
  private items: HTMLLIElement[] = [];
  
  constructor() {
    this.container = Base({ tag: "ul" });
  }
  
  updateItems(newItems: string[]) {
    // Reutilizar elementos existentes
    newItems.forEach((item, index) => {
      if (this.items[index]) {
        this.items[index].textContent = item;
      } else {
        const li = Base({ tag: "li", children: item });
        this.items[index] = li;
        this.container.appendChild(li);
      }
    });
    
    // Remover elementos extras
    while (this.items.length > newItems.length) {
      const removed = this.items.pop()!;
      removed.remove();
    }
  }
}
```

### Gerenciamento de memória - melhores práticas

#### Prevenção de vazamentos de memória

```typescript
// ✅ Cleanup completo em onunmount
const componenteSeguro = Base({
  onmount: (el) => {
    // Event listeners externos
    const resizeHandler = () => handleResize(el);
    window.addEventListener("resize", resizeHandler);
    
    // Timers
    const intervalId = setInterval(() => updateStatus(el), 1000);
    
    // Observers
    const observer = new ResizeObserver(entries => handleResize(entries));
    observer.observe(el);
    
    // Requests em andamento
    const abortController = new AbortController();
    fetch("/api/data", { signal: abortController.signal });
    
    // Armazenar referências para cleanup
    el._cleanup = {
      resizeHandler,
      intervalId,
      observer,
      abortController
    };
  },
  
  onunmount: (el) => {
    const cleanup = el._cleanup;
    if (cleanup) {
      // Remover event listeners
      window.removeEventListener("resize", cleanup.resizeHandler);
      
      // Limpar timers
      clearInterval(cleanup.intervalId);
      
      // Desconectar observers  
      cleanup.observer.disconnect();
      
      // Cancelar requests
      cleanup.abortController.abort();
      
      // Limpar referências
      delete el._cleanup;
    }
  }
});
```

#### Otimizações de performance avançadas

1. **Virtualização para listas grandes**
```typescript
class VirtualList {
  private container: HTMLElement;
  private itemHeight: number;
  private visibleCount: number;
  private startIndex = 0;
  
  constructor(items: any[], itemHeight = 50) {
    this.itemHeight = itemHeight;
    this.visibleCount = Math.ceil(window.innerHeight / itemHeight);
    
    this.container = Base({
      tag: "div",
      style: {
        height: "400px",
        overflow: "auto"
      },
      listeners: {
        scroll: (e) => this.handleScroll(e)
      }
    });
    
    this.render(items);
  }
  
  private handleScroll(e: Event) {
    const target = e.target as HTMLElement;
    const newStartIndex = Math.floor(target.scrollTop / this.itemHeight);
    
    if (newStartIndex !== this.startIndex) {
      this.startIndex = newStartIndex;
      this.updateVisibleItems();
    }
  }
  
  private updateVisibleItems() {
    // Atualizar apenas itens visíveis
    // Implementação de virtualização...
  }
}
```

2. **Batch DOM updates**
```typescript
class BatchUpdater {
  private updates: (() => void)[] = [];
  private scheduled = false;
  
  schedule(update: () => void) {
    this.updates.push(update);
    
    if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(() => {
        // Executar todas as atualizações de uma vez
        this.updates.forEach(update => update());
        this.updates = [];
        this.scheduled = false;
      });
    }
  }
}

const batcher = new BatchUpdater();

// Uso
function atualizarMultiplosElementos(elementos: HTMLElement[]) {
  elementos.forEach(el => {
    batcher.schedule(() => {
      el.style.transform = "scale(1.1)";
    });
  });
}
```

3. **Intersection Observer para lazy loading**
```typescript
function criarElementoComLazyLoading() {
  return Base({
    tag: "div",
    className: "lazy-container",
    onmount: (el) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Carregar conteúdo pesado apenas quando visível
            carregarConteudoPesado(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: "100px" // Carregar antes de ficar visível
      });
      
      observer.observe(el);
      
      // Armazenar para cleanup
      el._observer = observer;
    },
    
    onunmount: (el) => {
      if (el._observer) {
        el._observer.disconnect();
        delete el._observer;
      }
    }
  });
}
```

---

## Conclusão

O @jay-js/elements implementa uma arquitetura única que combina a simplicidade de elementos HTML nativos com funcionalidades modernas como ciclo de vida, conteúdo assíncrono e type safety completo. 

Os conceitos fundamentais apresentados - design headless, função Base como fundação, lifecycle management, sistema de children baseado em Promises, integração TypeScript, sistema de referências, padrões de eventos e otimizações de performance - trabalham juntos para fornecer uma base sólida para construção de interfaces web modernas.

Esta abordagem oferece máxima flexibilidade visual mantendo performance nativa do DOM e compatibilidade total com padrões web estabelecidos, resultando em aplicações mais leves, rápidas e maintíveis.