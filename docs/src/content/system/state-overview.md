---
category: State Management
categoryId: 2
articleId: 1
slug: state-overview
title: State Management Overview
description: Uma visão geral do sistema de gerenciamento de estado reativo do pacote @jay-js/system.
---

# Gerenciamento de Estado

O sistema de gerenciamento de estado do pacote `@jay-js/system` oferece uma solução simples mas poderosa para gerenciar dados reativos em aplicações TypeScript ou JavaScript. Com um design reativo elegante, ele permite um gerenciamento de dados eficiente em sua aplicação.

## Características principais

O sistema de estados inclui:

- **State**: Função principal para criar estados reativos
- **PersistentState**: Estados que persistem valores no localStorage
- **CombineStates**: Combinação de múltiplos estados em um único objeto
- **Derived**: Estados derivados que recalculam automaticamente quando dependências mudam
- **Effect**: Efeitos que executam automaticamente quando estados observados mudam
- **Values**: Helpers para definir valores em objetos reativamente

## Vantagens

- **Zero dependências externas** - solução leve e independente
- **Tipagem completa** - suporte total ao TypeScript
- **API simples** - fácil de aprender e usar
- **Reatividade automática** - com sistema de detecção de dependências
- **Flexibilidade** - funciona com abordagens mutáveis e imutáveis
- **Utilitários poderosos** - como estados persistentes, derivados e efeitos reativos

## Instalação

Para instalar o pacote `@jay-js/system`:

```bash
npm install @jay-js/system
```

ou

```bash
yarn add @jay-js/system
```

## Importação

```typescript
// Importação individual de funcionalidades
import { State, PersistentState, CombineStates, Derived, Effect, Values } from '@jay-js/system';

// Ou importando tudo
import * as System from '@jay-js/system';
```

Continue explorando cada funcionalidade em suas respectivas seções da documentação para entender como utilizá-las em seus projetos.