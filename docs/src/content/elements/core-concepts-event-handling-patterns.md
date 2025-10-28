---
category: Core Concepts
categoryId: 3
articleId: 7
slug: core-concepts-event-handling-patterns
title: Padrões de Manipulação de Eventos
description: Propriedades de evento diretas, objeto listeners para cenários complexos, event delegation, eventos customizados e padrões avançados como debounce e composition.
---

# Padrões de Manipulação de Eventos

## Propriedades de evento diretas

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

## Objeto listeners para cenários complexos

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

## Event delegation e performance

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

## Manipulação de eventos customizados

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

## Padrões avançados de eventos

### Debounce e throttle
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

### Event composition
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