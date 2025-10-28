---
category: Utilitários
categoryId: 7
articleId: 3
slug: utils-dom-render
title: Renderização DOM
description: Aprenda a usar a função de renderização para inserir conteúdo dinâmico no DOM.
---

# Renderização DOM

## Referência da API

### Função

```typescript
function render(
  target: TRenderTarget,
  content: TRenderContent,
  options: TRenderOptions = {}
): void;
```

### Parâmetros

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `target` | `TRenderTarget` | Elemento alvo ou seletor CSS |
| `content` | `TRenderContent` | Conteúdo a ser renderizado |
| `options` | `TRenderOptions` | Opções de renderização |

### Tipos

```typescript
// Alvo onde o conteúdo será renderizado
type TRenderTarget = HTMLElement | string | null;

// Item de conteúdo individual
type TRenderContentItem = Node | string | HTMLElement | null | undefined;

// Conteúdo completo a ser renderizado
type TRenderContent = TRenderContentItem | TRenderContentItem[] | null | undefined;

// Opções para a função render
type TRenderOptions = {
  insert?: "append" | "prepend";  // Modo de inserção (padrão: substituir)
};
```

## Visão Geral

A função `render()` simplifica a inserção de conteúdo no DOM. Ela aceita vários tipos de conteúdo (strings, elementos DOM, ou arrays destes) e oferece flexibilidade para substituir, anexar ou prepender conteúdo em elementos específicos.

## Uso Básico

A função `render()` aceita três argumentos principais:

- `target`: O elemento onde o conteúdo será renderizado (pode ser um elemento DOM ou seletor CSS)
- `content`: O conteúdo a ser renderizado (pode ser string, elemento DOM, array, etc.)
- `options`: Opções adicionais de renderização (opcional)

### Renderização Simples de Texto

```typescript
import { render } from '@jay-js/system';

// Renderizar texto simples em um elemento
render('#message', 'Olá, mundo!');

// Renderizar HTML como string
render('#content', '<h1>Bem-vindo</h1><p>Este é um exemplo de renderização.</p>');
```

### Renderização de Elementos DOM

```typescript
import { render } from '@jay-js/system';

// Criar um elemento e renderizá-lo
const button = document.createElement('button');
button.textContent = 'Clique Aqui';
button.classList.add('btn', 'btn-primary');

render('#actions', button);
```

### Renderização de Arrays de Conteúdo

```typescript
import { render } from '@jay-js/system';

// Criar múltiplos elementos
const header = document.createElement('h2');
header.textContent = 'Lista de Itens';

const list = document.createElement('ul');
const items = ['Item 1', 'Item 2', 'Item 3'];
items.forEach(text => {
  const li = document.createElement('li');
  li.textContent = text;
  list.appendChild(li);
});

// Renderizar múltiplos elementos de uma vez
render('#container', [header, list]);
```

## Opções de Inserção

Por padrão, `render()` substitui todo o conteúdo do elemento alvo. Você pode alterar esse comportamento usando a opção `insert`:

### Anexando Conteúdo

Para adicionar conteúdo no final do elemento alvo:

```typescript
import { render } from '@jay-js/system';

// Adicionar ao final do elemento
render('#log', '<p>Nova mensagem</p>', { insert: 'append' });
```

### Prepending Conteúdo

Para adicionar conteúdo no início do elemento alvo:

```typescript
import { render } from '@jay-js/system';

// Adicionar no início do elemento
render('#notifications', '<div class="alert">Nova notificação</div>', { 
  insert: 'prepend' 
});
```

## Tratamento de Valores Nulos

A função `render()` lida automaticamente com valores `null` e `undefined`, o que facilita a renderização condicional:

```typescript
import { render } from '@jay-js/system';

const isLoggedIn = true;
const userName = 'João';

render('#header', [
  '<h1>Painel</h1>',
  isLoggedIn ? `<p>Bem-vindo, ${userName}</p>` : null,
  isLoggedIn ? '<button>Sair</button>' : '<button>Entrar</button>'
]);
```

## Integração com Componentes

A função `render()` funciona bem com componentes e funções que retornam elementos DOM:

```typescript
import { render } from '@jay-js/system';

// Função de componente
function Card({ title, content }) {
  const card = document.createElement('div');
  card.className = 'card';
  
  const cardTitle = document.createElement('h3');
  cardTitle.textContent = title;
  
  const cardBody = document.createElement('div');
  cardBody.innerHTML = content;
  
  card.append(cardTitle, cardBody);
  return card;
}

// Renderizar componentes
render('#content', [
  Card({ 
    title: 'Notícias', 
    content: '<p>Novidades sobre nossos produtos.</p>' 
  }),
  Card({ 
    title: 'Eventos', 
    content: '<p>Próximos eventos da comunidade.</p>' 
  })
]);
```

## Exemplos Práticos

### Atualização de Lista Dinâmica

```typescript
import { render, selector } from '@jay-js/system';

// Dados dinâmicos
let tasks = [
  { id: 1, text: 'Concluir relatório', completed: false },
  { id: 2, text: 'Reunião às 14h', completed: true },
  { id: 3, text: 'Preparar apresentação', completed: false }
];

// Função para renderizar tarefas
function renderTasks() {
  const taskElements = tasks.map(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'task completed' : 'task';
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
      <span>${task.text}</span>
      <button data-id="${task.id}">Remover</button>
    `;
    return li;
  });
  
  render('#task-list', taskElements);
  
  // Adicionar manipuladores de eventos após renderização
  setupEventListeners();
}

function setupEventListeners() {
  const taskList = selector('#task-list');
  
  if (taskList) {
    // Manipular marcação de conclusão
    taskList.addEventListener('change', e => {
      const target = e.target as HTMLInputElement;
      if (target.type === 'checkbox') {
        const taskId = Number(target.dataset.id);
        tasks = tasks.map(task => 
          task.id === taskId ? { ...task, completed: target.checked } : task
        );
      }
    });
    
    // Manipular remoção de tarefas
    taskList.addEventListener('click', e => {
      const target = e.target as HTMLButtonElement;
      if (target.tagName === 'BUTTON') {
        const taskId = Number(target.dataset.id);
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
      }
    });
  }
}

// Inicializar
renderTasks();

// Adicionar nova tarefa
function addTask(text) {
  const newId = Math.max(0, ...tasks.map(t => t.id)) + 1;
  tasks.push({ id: newId, text, completed: false });
  renderTasks();
}

// Exemplo de uso
document.querySelector('#add-task-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const input = selector<HTMLInputElement>('#new-task-input');
  if (input && input.value.trim()) {
    addTask(input.value.trim());
    input.value = '';
  }
});
```

### Alternância de Visualizações

```typescript
import { render, selector } from '@jay-js/system';

const views = {
  home: () => `<h1>Página Inicial</h1><p>Bem-vindo ao nosso site.</p>`,
  about: () => `<h1>Sobre Nós</h1><p>Nossa história e missão.</p>`,
  contact: () => `<h1>Contato</h1><form>...</form>`
};

// Função para trocar a visualização
function showView(viewName) {
  if (views[viewName]) {
    render('#app', views[viewName]());
    
    // Atualizar navegação
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      if (link.getAttribute('data-view') === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

// Inicializar com a visualização padrão
showView('home');

// Configurar navegação
document.querySelector('nav')?.addEventListener('click', e => {
  e.preventDefault();
  const target = e.target as HTMLAnchorElement;
  if (target.tagName === 'A') {
    const viewName = target.dataset.view;
    if (viewName) {
      showView(viewName);
    }
  }
});
``` 