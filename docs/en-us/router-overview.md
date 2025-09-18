---
category: Roteamento
categoryId: 1
articleId: 1
slug: router-overview
title: Visão Geral do Router
description: Conheça o sistema de roteamento para aplicações de página única sem recarregamento de página.
---

# Visão Geral do Router

## Referência da API

### Funções Principais

| Função | Descrição |
|--------|-----------|
| `Router(routes, options?)` | Inicializa o sistema de roteamento com as rotas e opções especificadas |
| `Navigate(path)` | Navega programaticamente para uma rota específica |
| `beforeNavigate(guardFn)` | Registra uma função que executa antes da navegação |
| `getParams()` | Recupera os parâmetros da rota atual |
| `routerDefineOptions(options)` | Define opções do router independente da inicialização |

### Tipos Principais

| Tipo | Descrição |
|------|-----------|
| `TRoute` | Configuração de uma rota no sistema |
| `TRouterOptions` | Opções de configuração do router |

## O que é o Router?

O Router do @jay-js/system é uma biblioteca leve e flexível para roteamento do lado do cliente em aplicações de página única (SPA). Ele permite a navegação baseada em caminhos sem recarregar a página, potencializado pela biblioteca path-to-regexp para capacidades avançadas de correspondência de caminhos.

## Funcionamento Básico

O Router funciona interceptando eventos de navegação e renderizando componentes correspondentes em elementos DOM específicos, sem recarregar a página. Isso resulta em:

- Transições suaves entre páginas
- Melhor experiência do usuário
- Gerenciamento de estado simplificado
- Rotas aninhadas e layouts

## Instalação

O Router é parte do pacote @jay-js/system:

```bash
npm install @jay-js/system
```

## Exemplo Básico

```javascript
import { Router, Navigate } from '@jay-js/system';

// Definição das rotas
Router([
  {
    path: '/',
    element: () => {
      const el = document.createElement('div');
      el.textContent = 'Página Inicial';
      return el;
    }
  },
  {
    path: '/sobre',
    element: () => {
      const el = document.createElement('div');
      el.textContent = 'Sobre Nós';
      return el;
    }
  }
], {
  target: '#app'
});

// Links de navegação
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    Navigate(link.getAttribute('href'));
  });
});
```

## Recursos Principais

- **Roteamento sem recarregamento**: Navegação entre páginas sem atualizar o navegador
- **Correspondência de padrões de caminho**: Suporte para parâmetros de rota, parâmetros opcionais e padrões complexos
- **Rotas aninhadas**: Estruturas de rota hierárquicas para aplicações complexas
- **Layouts**: Suporte para layouts compartilhados entre várias rotas
- **Carregamento preguiçoso (lazy loading)**: Carregue componentes sob demanda para melhorar o desempenho
- **Guardas de rota**: Controle de acesso baseado em lógica personalizada
- **Navegação programática**: API para navegar entre rotas a partir do código 