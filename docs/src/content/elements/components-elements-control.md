---
category: Components
categoryId: 2
articleId: 6
slug: components-elements-control
title: Elementos de Controle
description: Documentação do componente Progress para indicar andamento de operações e outros elementos de controle.
---



## Elementos de Controle

### Progress

**Propósito**: Barra de progresso para indicar o andamento de operações.

**Assinatura TypeScript**:
```typescript
function Progress<T extends TBaseTagMap = "progress">(
  props?: TProgress<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { Progress, Button, Typography } from '@jay-js/elements';

// Barra de progresso básica
const basicProgress = Progress({
  value: 70,
  max: 100,
  className: 'progress progress-primary w-full'
});

// Progresso indeterminado (carregando)
const loadingProgress = Progress({
  className: 'progress progress-primary w-full'
  // Sem value = progresso indeterminado
});

// Progresso com texto
const textProgress = Progress({
  value: 45,
  max: 100,
  className: 'progress progress-secondary w-full',
  onmount: (element) => {
    // Criar texto de porcentagem
    const container = element.parentElement;
    if (container) {
      const label = Typography({
        className: 'text-center text-sm font-medium mt-2',
        children: '45% concluído'
      });
      container.appendChild(label);
    }
  }
});

// Progresso animado
let currentProgress = 0;
const animatedProgress = Progress({
  value: currentProgress,
  max: 100,
  className: 'progress progress-accent w-full',
  onmount: (element) => {
    const progressEl = element as HTMLProgressElement;
    const interval = setInterval(() => {
      currentProgress += 1;
      progressEl.value = currentProgress;
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        console.log('Progresso concluído!');
      }
    }, 100);
  }
});

// Múltiplas barras de progresso
const skillsProgress = [
  { skill: 'JavaScript', level: 90 },
  { skill: 'TypeScript', level: 85 },
  { skill: 'React', level: 80 },
  { skill: 'Node.js', level: 75 }
].map(({ skill, level }) => 
  Box({
    className: 'mb-4',
    children: [
      Box({
        className: 'flex justify-between mb-1',
        children: [
          Typography({
            tag: 'span',
            className: 'font-medium',
            children: skill
          }),
          Typography({
            tag: 'span',
            className: 'text-sm text-base-content/70',
            children: `${level}%`
          })
        ]
      }),
      Progress({
        value: level,
        max: 100,
        className: 'progress progress-primary w-full'
      })
    ]
  })
);

// Progresso de upload com controle
let uploadProgress = 0;
const uploadProgressBar = Progress({
  value: uploadProgress,
  max: 100,
  className: 'progress progress-info w-full'
});

const uploadButton = Button({
  children: 'Iniciar Upload',
  className: 'btn btn-primary',
  onclick: () => {
    uploadProgress = 0;
    (uploadProgressBar as HTMLProgressElement).value = 0;
    
    // Simular upload
    const interval = setInterval(() => {
      uploadProgress += Math.random() * 10;
      (uploadProgressBar as HTMLProgressElement).value = Math.min(uploadProgress, 100);
      
      if (uploadProgress >= 100) {
        clearInterval(interval);
        alert('Upload concluído!');
      }
    }, 200);
  }
});

// Progresso com estados diferentes
const stateProgress = Progress({
  value: 30,
  max: 100,
  className: 'progress progress-error w-full', // Vermelho para erro
  dataset: { state: 'error' },
  onmount: (element) => {
    // Alterar cor baseado no progresso
    const progressEl = element as HTMLProgressElement;
    const updateColor = () => {
      const value = progressEl.value;
      const max = progressEl.max;
      const percentage = (value / max) * 100;
      
      progressEl.className = `progress w-full ${
        percentage < 30 ? 'progress-error' :
        percentage < 70 ? 'progress-warning' :
        'progress-success'
      }`;
    };
    
    // Observar mudanças no valor
    const observer = new MutationObserver(updateColor);
    observer.observe(progressEl, { 
      attributes: true, 
      attributeFilter: ['value'] 
    });
  }
});
```

---

## Padrões de Integração

### Gerenciamento de Ciclo de Vida

Todos os componentes suportam callbacks `onmount` e `onunmount` para gerenciamento de recursos:

```typescript
import { Base, useRef } from '@jay-js/elements';

const managedElement = Base({
  tag: 'div',
  onmount: (element) => {
    console.log('Elemento montado no DOM');
    
    // Configurar event listeners externos
    const handleResize = () => console.log('Janela redimensionada');
    window.addEventListener('resize', handleResize);
    
    // Armazenar referência para cleanup
    element.dataset.resizeListener = 'true';
  },
  
  onunmount: (element) => {
    console.log('Elemento sendo removido do DOM');
    
    // Cleanup de recursos
    if (element.dataset.resizeListener) {
      const handleResize = () => console.log('Janela redimensionada');
      window.removeEventListener('resize', handleResize);
    }
  }
});
```

### Sistema de Referências

Use `useRef` para acesso direto a elementos:

```typescript
import { Button, useRef } from '@jay-js/elements';

const buttonRef = useRef<HTMLButtonElement>();

const controlledButton = Button({
  ref: buttonRef,
  children: 'Botão Controlado',
  onclick: () => {
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.disabled = false;
        }
      }, 2000);
    }
  }
});
```

### Filhos Baseados em Promises

Suporte nativo para carregamento assíncrono de conteúdo:

```typescript
import { Box } from '@jay-js/elements';

const asyncContent = Box({
  children: [
    'Carregando dados...',
    fetch('/api/data')
      .then(res => res.json())
      .then(data => Typography({
        children: `Dados carregados: ${data.message}`
      }))
      .catch(error => Typography({
        className: 'text-error',
        children: `Erro: ${error.message}`
      }))
  ]
});
```

### Event Listeners Avançados

Use o objeto `listeners` para múltiplos event handlers:

```typescript
import { Base } from '@jay-js/elements';

const interactiveElement = Base({
  className: 'interactive-zone',
  listeners: {
    mouseenter: () => console.log('Mouse entrou'),
    mouseleave: () => console.log('Mouse saiu'),
    focus: () => console.log('Elemento focado'),
    blur: () => console.log('Elemento perdeu foco'),
    keydown: (event) => {
      if (event.key === 'Enter') {
        console.log('Enter pressionado');
      }
    }
  },
  children: 'Zona interativa'
});
```

---

## Boas Práticas

### 1. Sempre Use TypeScript
```typescript
// ✅ Correto - com tipagem explícita
const button = Button({
  children: 'Clique aqui',
  onclick: (event: MouseEvent) => {
    const target = event.currentTarget as HTMLButtonElement;
    target.disabled = true;
  }
});

// ❌ Evitar - sem tipagem
const button = Button({
  children: 'Clique aqui',
  onclick: (event) => {
    event.currentTarget.disabled = true; // Pode gerar erro
  }
});
```

### 2. Gerencie Recursos Adequadamente
```typescript
// ✅ Correto - cleanup adequado
const managedComponent = Base({
  onmount: (element) => {
    const interval = setInterval(() => {
      console.log('Tick');
    }, 1000);
    element.dataset.intervalId = interval.toString();
  },
  
  onunmount: (element) => {
    const intervalId = element.dataset.intervalId;
    if (intervalId) {
      clearInterval(parseInt(intervalId));
    }
  }
});
```

### 3. Use Referências Quando Necessário
```typescript
// ✅ Correto - ref para controle direto
const inputRef = useRef<HTMLInputElement>();
const input = TextInput({
  ref: inputRef,
  placeholder: 'Digite algo...'
});

// Controle posterior
setTimeout(() => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
}, 1000);
```

### 4. Aproveite as Classes do Tailwind
```typescript
// ✅ Correto - classes responsivas e utilitárias
const responsiveBox = Box({
  className: 'w-full max-w-md mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
});
```

### 5. Combine Elementos para Criar Componentes
```typescript
// ✅ Correto - componente personalizado
function Card({ title, content, actions }) {
  return Box({
    className: 'card bg-base-100 shadow-xl',
    children: [
      Box({
        className: 'card-body',
        children: [
          Typography({
            tag: 'h2',
            className: 'card-title',
            children: title
          }),
          Typography({
            children: content
          }),
          Box({
            className: 'card-actions justify-end',
            children: actions
          })
        ]
      })
    ]
  });
}
```

---

Esta documentação fornece uma visão completa de todos os componentes disponíveis no pacote `@jay-js/elements`. Cada componente é projetado para ser type-safe, flexível e fácil de usar, mantendo a compatibilidade total com HTML nativo e CSS frameworks como Tailwind CSS.

Para mais informações sobre implementação e exemplos avançados, consulte a documentação oficial do Jay JS framework.