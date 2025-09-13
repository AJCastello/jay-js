---
category: Utilitários
categoryId: 7
articleId: 2
slug: utils-dom-selectors
title: Seletores DOM
description: Aprenda a usar as funções de seleção de elementos DOM para encontrar elementos em sua aplicação.
---

# Seletores DOM

## Referência da API

### Funções

```typescript
// Seleciona o primeiro elemento que corresponde ao seletor
function selector<T extends HTMLElement>(
  selector: string,
  target: HTMLElement | Document = document,
  options: TQueryOptions = {}
): T | null;

// Seleciona todos os elementos que correspondem ao seletor
function selectors<T extends NodeListOf<Element>>(
  selector: string,
  target: HTMLElement | Document = document,
  options: TQueryOptions = {}
): T;
```

### Parâmetros

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `selector` | `string` | Seletor CSS para encontrar elementos |
| `target` | `HTMLElement \| Document` | Elemento ou documento raiz para buscar (padrão: document) |
| `options` | `TQueryOptions` | Opções adicionais para configurar a consulta |

### Tipos

```typescript
type TQueryOptions = {
  onlyVisible?: boolean;    // Retorna apenas elementos visíveis
  includeNested?: boolean;  // Inclui elementos aninhados nos resultados
};
```

## Visão Geral

As funções `selector()` e `selectors()` fornecem métodos simples e poderosos para encontrar elementos no DOM usando seletores CSS. Essas funções são otimizadas para uso em aplicações modernas, oferecendo funcionalidades adicionais não disponíveis nas APIs nativas de consulta do DOM.

## Seleção Básica de Elementos

### Selecionando um Único Elemento

A função `selector()` retorna o primeiro elemento que corresponde ao seletor CSS fornecido:

```typescript
import { selector } from '@jay-js/system';

// Seleciona o primeiro elemento com a classe "menu-item"
const menuItem = selector('.menu-item');

// Seleciona o elemento com ID "header"
const header = selector('#header');

// Seleciona o primeiro botão dentro de um formulário
const submitButton = selector('form button[type="submit"]');
```

### Selecionando Múltiplos Elementos

A função `selectors()` retorna todos os elementos que correspondem ao seletor CSS fornecido:

```typescript
import { selectors } from '@jay-js/system';

// Seleciona todos os elementos com a classe "menu-item"
const menuItems = selectors('.menu-item');

// Seleciona todos os parágrafos
const paragraphs = selectors('p');

// Seleciona todos os inputs de checkbox marcados
const checkedBoxes = selectors('input[type="checkbox"]:checked');

// Itera sobre os elementos
menuItems.forEach(item => {
  item.classList.add('active');
});
```

## Opções Avançadas

As funções de seleção aceitam opções adicionais para refinar a busca:

### Selecionando Apenas Elementos Visíveis

```typescript
import { selectors } from '@jay-js/system';

// Retorna apenas botões visíveis
const visibleButtons = selectors('button', document, { onlyVisible: true });

console.log(`Encontrados ${visibleButtons.length} botões visíveis`);
```

### Excluindo Elementos Aninhados

Por padrão, todos os elementos que correspondem ao seletor são retornados, incluindo aqueles aninhados dentro de outros elementos correspondentes. Para retornar apenas elementos de "primeiro nível":

```typescript
import { selectors } from '@jay-js/system';

// Sem a opção includeNested: false
const allCards = selectors('.card');
// Pode incluir cartões aninhados dentro de outros cartões

// Com a opção includeNested: false
const topLevelCards = selectors('.card', document, { includeNested: false });
// Retorna apenas cartões que não estão dentro de outros cartões
```

## Tipagem com TypeScript

As funções de seleção utilizam genéricos para oferecer suporte à tipagem:

```typescript
import { selector, selectors } from '@jay-js/system';

// Tipando para um elemento específico
const header = selector<HTMLHeadingElement>('h1');
if (header) {
  header.textContent = 'Novo Título';
}

// Tipando para um tipo de elemento específico
const buttons = selectors<NodeListOf<HTMLButtonElement>>('button');
buttons.forEach(button => {
  button.disabled = false;
});
```

## Seleção em Elementos Específicos

Você pode limitar a busca a um elemento específico, o que é útil para componentes isolados:

```typescript
import { selector, selectors } from '@jay-js/system';

// Primeiro, encontre o contêiner
const sidebar = selector('.sidebar');

if (sidebar) {
  // Em seguida, procure elementos apenas dentro desse contêiner
  const sidebarLinks = selectors('a', sidebar);
  
  console.log(`A barra lateral tem ${sidebarLinks.length} links`);
  
  // Encontre um item específico dentro do contêiner
  const activeItem = selector('.active', sidebar);
}
```

## Exemplos Práticos

### Criando uma Lista de Tarefas Interativa

```typescript
import { selector, selectors, render } from '@jay-js/system';

// Função para marcar tarefas como concluídas
function setupTaskList() {
  const taskItems = selectors('.task-item');
  
  taskItems.forEach(item => {
    const checkbox = selector('input[type="checkbox"]', item);
    
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          item.classList.add('completed');
        } else {
          item.classList.remove('completed');
        }
      });
    }
  });
}

// Função para filtrar tarefas
function setupFilters() {
  const filterAll = selector('#filter-all');
  const filterActive = selector('#filter-active');
  const filterCompleted = selector('#filter-completed');
  
  if (filterAll && filterActive && filterCompleted) {
    filterAll.addEventListener('click', () => {
      selectors('.task-item').forEach(item => {
        item.style.display = 'block';
      });
    });
    
    filterActive.addEventListener('click', () => {
      selectors('.task-item').forEach(item => {
        item.style.display = item.classList.contains('completed') ? 'none' : 'block';
      });
    });
    
    filterCompleted.addEventListener('click', () => {
      selectors('.task-item').forEach(item => {
        item.style.display = item.classList.contains('completed') ? 'block' : 'none';
      });
    });
  }
}

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
  setupTaskList();
  setupFilters();
});
``` 