---
category: Utilitários
categoryId: 7
articleId: 1
slug: utils-overview
title: Visão Geral de Utilitários
description: Conheça os utilitários disponíveis no @jay-js/system para manipulação do DOM e outras operações comuns.
---

# Visão Geral de Utilitários

## Referência da API

### Utilitários DOM

```typescript
// Seletor de elementos
const element = selector<HTMLElement>(cssSelector, target?, options?);

// Seletor múltiplo
const elements = selectors<NodeListOf<Element>>(cssSelector, target?, options?);

// Renderização
render(target, content, options?);
```

### Utilitários Core

```typescript
// Geração de IDs únicos
const id = uniKey(length?, chars?);
```

## Introdução

A biblioteca @jay-js/system oferece um conjunto de utilitários para facilitar operações comuns no desenvolvimento web, como manipulação do DOM e geração de identificadores únicos.

Estes utilitários permitem que você:

- Selecione elementos no DOM de forma eficiente
- Renderize conteúdo em elementos específicos
- Gere identificadores únicos para elementos ou instâncias

## Categorias de Utilitários

Os utilitários estão organizados em duas categorias principais:

### 1. Utilitários DOM

Funções para manipulação do DOM, incluindo:

- `selector()` - Seleciona o primeiro elemento que corresponde a um seletor CSS
- `selectors()` - Seleciona todos os elementos que correspondem a um seletor CSS
- `render()` - Renderiza conteúdo em um elemento do DOM

### 2. Utilitários Core

Funções para operações fundamentais, incluindo:

- `uniKey()` - Gera um identificador único e aleatório

## Como Usar

Importe os utilitários conforme necessário:

```typescript
import { selector, render, uniKey } from '@jay-js/system';

// Selecionar elemento
const button = selector('#submit-button');

// Renderizar conteúdo
render('#app', '<h1>Olá Mundo</h1>');

// Gerar ID único
const sessionId = uniKey();
```

## Próximos Passos

Explore as páginas de documentação específicas para cada categoria de utilitários:

- [Utilitários DOM: Seletores](/system/utils-dom-selectors) - Aprenda a selecionar elementos no DOM
- [Utilitários DOM: Renderização](/system/utils-dom-render) - Aprenda a renderizar conteúdo no DOM
- [Utilitários Core: Chaves Únicas](/system/utils-core-keys) - Aprenda a gerar identificadores únicos 