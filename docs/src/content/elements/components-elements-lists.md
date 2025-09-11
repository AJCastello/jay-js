---
category: Components
categoryId: 2
articleId: 5
slug: components-elements-lists
title: Elementos de Lista
description: Documentação dos componentes List e ListItem para criação de listas ordenadas, não ordenadas e navegação.
---

# Elementos de Lista

## List

**Propósito**: Container para listas ordenadas (ol) ou não ordenadas (ul).

**Assinatura TypeScript**:
```typescript
function List<T extends TBaseTagMap = "ul">(
  props?: TList<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { List, ListItem } from '@jay-js/elements';

// Lista não ordenada
const featuresList = List({
  className: 'list-disc list-inside space-y-2',
  children: [
    ListItem({ children: 'Interface intuitiva e moderna' }),
    ListItem({ children: 'Performance otimizada' }),
    ListItem({ children: 'Suporte completo ao TypeScript' }),
    ListItem({ children: 'Documentação abrangente' })
  ]
});

// Lista ordenada
const stepsList = List({
  tag: 'ol',
  className: 'list-decimal list-inside space-y-3',
  children: [
    ListItem({ children: 'Faça o download do pacote' }),
    ListItem({ children: 'Execute o comando de instalação' }),
    ListItem({ children: 'Configure as variáveis de ambiente' }),
    ListItem({ children: 'Inicie a aplicação' })
  ]
});

// Lista de navegação
const navList = List({
  className: 'menu menu-horizontal bg-base-100 rounded-box',
  children: [
    ListItem({
      children: Link({
        href: '/',
        className: 'menu-item',
        children: 'Home'
      })
    }),
    ListItem({
      children: Link({
        href: '/products',
        className: 'menu-item',
        children: 'Produtos'
      })
    }),
    ListItem({
      children: Link({
        href: '/contact',
        className: 'menu-item',
        children: 'Contato'
      })
    })
  ]
});

// Lista com conteúdo complexo
const cardsList = List({
  className: 'space-y-4',
  children: [
    ListItem({
      className: 'card bg-base-100 shadow-xl',
      children: Box({
        className: 'card-body',
        children: [
          Typography({
            tag: 'h3',
            className: 'card-title',
            children: 'Produto 1'
          }),
          Typography({
            children: 'Descrição do produto...'
          }),
          Box({
            className: 'card-actions justify-end',
            children: Button({
              className: 'btn btn-primary',
              children: 'Comprar'
            })
          })
        ]
      })
    }),
    // Mais itens...
  ]
});

// Lista dinâmica
const dynamicList = List({
  className: 'space-y-2',
  onmount: (element) => {
    // Carregar dados dinamicamente
    fetch('/api/items')
      .then(res => res.json())
      .then(items => {
        element.replaceChildren(
          ...items.map(item => 
            ListItem({
              key: item.id,
              className: 'p-2 hover:bg-base-200 rounded',
              children: item.name
            })
          )
        );
      });
  }
});
```

---

## ListItem

**Propósito**: Item individual de lista (li).

**Assinatura TypeScript**:
```typescript
function ListItem<T extends TBaseTagMap = "li">(
  props?: TListItem<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { ListItem, Typography, Button } from '@jay-js/elements';

// Item simples
const simpleItem = ListItem({
  children: 'Item da lista'
});

// Item com conteúdo rico
const richItem = ListItem({
  className: 'flex items-center justify-between p-3 border-b',
  children: [
    Box({
      children: [
        Typography({
          tag: 'h4',
          className: 'font-medium',
          children: 'Título do Item'
        }),
        Typography({
          className: 'text-sm text-base-content/70',
          children: 'Descrição adicional'
        })
      ]
    }),
    Button({
      className: 'btn btn-sm btn-ghost',
      children: 'Ação'
    })
  ]
});

// Item interativo
const interactiveItem = ListItem({
  className: 'cursor-pointer hover:bg-base-200 p-3 rounded transition-colors',
  onclick: (event) => {
    const item = event.currentTarget as HTMLElement;
    item.classList.toggle('selected');
    console.log('Item selecionado:', item.textContent);
  },
  children: 'Item clicável'
});

// Item com checkbox
const checkboxItem = ListItem({
  className: 'flex items-center gap-3 p-2',
  children: [
    Checkbox({
      id: 'task-1',
      onchange: (event) => {
        const checkbox = event.target as HTMLInputElement;
        const label = checkbox.nextElementSibling as HTMLElement;
        if (label) {
          label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        }
      }
    }),
    Typography({
      tag: 'label',
      htmlFor: 'task-1',
      className: 'cursor-pointer flex-1',
      children: 'Tarefa a ser completada'
    })
  ]
});

// Item arrastrável
const draggableItem = ListItem({
  draggable: true,
  className: 'draggable-item p-3 border rounded cursor-move',
  ondragstart: (event) => {
    const item = event.currentTarget as HTMLElement;
    event.dataTransfer?.setData('text/plain', item.id);
    item.classList.add('opacity-50');
  },
  ondragend: (event) => {
    const item = event.currentTarget as HTMLElement;
    item.classList.remove('opacity-50');
  },
  children: 'Arraste este item'
});
```

---