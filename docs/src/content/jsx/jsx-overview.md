---
category: JSX
categoryId: 5
articleId: 1
slug: jsx-overview
title: Visão Geral do JSX
description: Entenda o que é o pacote JSX, suas funcionalidades e como ele permite utilizar a sintaxe JSX nos seus projetos Jay JS.
---

# Visão Geral do JSX

## Referência da API

### Exportações Principais

```typescript
// Componentes e funções principais
import { jsx, jsxs, Fragment } from '@jay-js/jsx';

// Função para desenvolvimento
import { jsxDEV } from '@jay-js/jsx';

// Plugin Vite
import { jayJsxPlugin } from '@jay-js/jsx';
```

### Módulos e Funcionalidades

| Módulo/Função | Descrição |
|---------------|-----------|
| `jsx` | Função principal para transformação de JSX em ambiente de produção |
| `jsxs` | Alias para `jsx`, usado para elementos com children estáticos |
| `jsxDEV` | Função de transformação JSX para ambiente de desenvolvimento |
| `Fragment` | Componente especial que permite agrupar elementos sem criar nós extras no DOM |
| `jayJsxPlugin` | Plugin para integração com Vite |

## Visão Geral

O pacote `@jay-js/jsx` fornece uma implementação de runtime JSX para aplicações Jay JS, permitindo que você utilize a sintaxe JSX para criar componentes e interfaces de usuário de forma declarativa. O JSX é uma extensão de sintaxe para JavaScript que lembra HTML e facilita a criação de elementos da interface.

Este pacote funciona como a ponte entre o código JSX que você escreve e o Jay JS, convertendo as expressões JSX em elementos DOM ou componentes funcionais.

## O que é JSX?

JSX (JavaScript XML) é uma extensão de sintaxe que permite escrever código HTML-like dentro de JavaScript. Com JSX, você pode:

- Declarar elementos de forma mais legível e intuitiva
- Compor componentes de forma hierárquica
- Inserir expressões JavaScript dentro do markup

Por exemplo, este código JSX:

```jsx
const element = <h1>Olá, mundo!</h1>;
```

É transformado internamente para:

```js
const element = jsx("h1", { children: "Olá, mundo!" });
```

## Principais Características

O pacote `@jay-js/jsx` inclui:

- **Runtime JSX**: Funções para converter JSX em elementos DOM
- **Declarações TypeScript**: Tipagem completa para melhor experiência de desenvolvimento
- **Fragment**: Suporte para fragmentos que não adicionam elementos extras ao DOM
- **Plugin Vite**: Integração simplificada com projetos Vite
- **Suporte a ambientes de desenvolvimento**: Funções específicas para ambiente de desenvolvimento

## Como Funciona

Quando você escreve JSX em seus arquivos, o compilador (como TypeScript, Babel ou Vite) transforma esse código em chamadas para a função `jsx()` ou `jsxDEV()`. Essas funções são responsáveis por criar elementos DOM ou componentes Jay JS.

O pacote `@jay-js/jsx` se integra com `@jay-js/ui` para renderizar elementos HTML e componentes no navegador, permitindo que você construa interfaces de usuário complexas de forma declarativa e eficiente.

## Exemplo Básico

Aqui está um exemplo básico de como usar JSX em Jay JS:

```jsx
/** @jsx jsx */
import { jsx } from '@jay-js/jsx';

function Greeting({ name }) {
  return <h1>Olá, {name}!</h1>;
}

// Renderizar no documento
document.body.appendChild(<Greeting name="Mundo" />);
```

Nos próximos artigos, exploraremos como configurar e utilizar todas as funcionalidades do pacote JSX do Jay JS em seus projetos. 