---
category: Roteamento
categoryId: 1
articleId: 4
slug: router-routes
title: Definição de Rotas
description: Aprenda como definir e estruturar rotas na sua aplicação, incluindo rotas aninhadas e layouts.
---

# Definição de Rotas

## Referência da API

### Estrutura de Rota

```typescript
type TRoute = {
  // Propriedades obrigatórias
  path: string;
  
  // Propriedades opcionais
  element?: (HTMLElement | DocumentFragment) | 
            ((params?: any) => HTMLElement | DocumentFragment) | 
            ((params?: any) => Promise<HTMLElement | DocumentFragment>) | 
            undefined;
  target?: HTMLElement | string;
  layout?: boolean;
  children?: Array<TRoute>;
  import?: () => Promise<any>;
  module?: string;
  params?: Record<string, any>;
  loader?: HTMLElement;
  guard?: (route: TRouteInstance) => boolean | Promise<boolean>;
  metadata?: Record<string, any>;
};
```

## Estrutura Básica de Rotas

Cada rota é definida como um objeto com propriedades que determinam seu comportamento:

```javascript
import { Router } from '@jay-js/system';

Router([
  {
    path: '/',
    element: () => criarComponenteInicial()
  },
  {
    path: '/sobre',
    element: () => criarComponenteSobre()
  },
  {
    path: '/contato',
    element: () => criarComponenteContato(),
    target: '#conteudo-secundario' // Alvo específico para esta rota
  }
]);
```

## Propriedades de Rota

### Path (Caminho)

O `path` define o padrão de URL que ativa a rota. Suporta:

- Caminhos simples: `/sobre`, `/contato`
- Parâmetros: `/usuarios/:id`, `/produtos/:categoria/:produtoId`
- Parâmetros opcionais: `/posts/:ano?/:mes?/:dia?`
- Padrões complexos: `/arquivos/:nome{.*}`

```javascript
Router([
  { path: '/usuarios/:id', element: () => criarPaginaUsuario() },
  { path: '/produtos/:categoria/:id', element: () => criarPaginaProduto() }
]);
```

### Element (Elemento)

A propriedade `element` define o conteúdo a ser renderizado quando a rota é correspondida. Pode ser:

- Um elemento HTML/DocumentFragment
- Uma função que retorna um elemento
- Uma função que retorna uma Promise que resolve para um elemento
- Undefined (para rotas que não renderizam conteúdo, como redirecionamentos)

```javascript
Router([
  // Elemento simples
  {
    path: '/basico',
    element: document.createElement('div')
  },
  
  // Função que retorna um elemento
  {
    path: '/funcao',
    element: () => {
      const el = document.createElement('div');
      el.textContent = 'Criado via função';
      return el;
    }
  },
  
  // Função que recebe parâmetros
  {
    path: '/usuarios/:id',
    element: (params) => {
      const el = document.createElement('div');
      el.textContent = `Usuário ${params.id}`;
      return el;
    }
  },
  
  // Função assíncrona
  {
    path: '/async',
    element: async () => {
      const dados = await carregarDados();
      const el = document.createElement('div');
      el.textContent = dados.titulo;
      return el;
    }
  }
]);
```

### Target (Alvo)

A propriedade `target` define onde o elemento será renderizado. Pode ser:

- Um seletor CSS como string
- Uma referência direta a um elemento DOM

Se omitido, usa o target global definido nas opções do router.

```javascript
Router([
  {
    path: '/principal',
    element: () => criarComponente(),
    target: '#conteudo-principal'
  },
  {
    path: '/lateral',
    element: () => criarComponenteLateral(),
    target: document.querySelector('.sidebar')
  }
]);
```

### Layout

A propriedade `layout` indica que esta rota serve como um layout para rotas filhas.

```javascript
Router([
  {
    path: '/',
    element: () => criarLayoutPrincipal(),
    layout: true,
    children: [
      {
        path: '/dashboard',
        element: () => criarDashboard()
      },
      {
        path: '/perfil',
        element: () => criarPerfil()
      }
    ]
  }
]);
```

### Children (Rotas Filhas)

A propriedade `children` permite definir rotas aninhadas. As rotas filhas:

- Herdam o prefixo de caminho da rota pai
- São renderizadas dentro do elemento da rota pai (se for um layout)
- Podem ter suas próprias rotas filhas (aninhamento multinível)

```javascript
Router([
  {
    path: '/admin',
    element: () => criarLayoutAdmin(),
    layout: true,
    children: [
      { path: '/dashboard', element: () => criarDashboardAdmin() },
      { path: '/usuarios', element: () => criarListaUsuarios() },
      { 
        path: '/configuracoes',
        element: () => criarLayoutConfiguracoes(),
        layout: true,
        children: [
          { path: '/geral', element: () => criarConfigGeral() },
          { path: '/seguranca', element: () => criarConfigSeguranca() }
        ]
      }
    ]
  }
]);
```

### Guard (Guarda de Rota)

A propriedade `guard` é uma função que controla o acesso à rota:

```javascript
Router([
  {
    path: '/admin',
    element: () => criarPaginaAdmin(),
    guard: () => {
      const usuario = obterUsuarioAtual();
      return usuario && usuario.admin === true;
    }
  },
  {
    path: '/premium/:recursoId',
    element: () => criarPaginaConteudoPremium(),
    guard: async (rota) => {
      const { recursoId } = getParams();
      const temAcesso = await verificarAcessoPremium(recursoId);
      if (!temAcesso) {
        Navigate('/assinar');
        return false;
      }
      return true;
    }
  }
]);
```

### Metadata (Metadados)

A propriedade `metadata` permite associar dados adicionais à rota:

```javascript
Router([
  {
    path: '/',
    element: () => criarPaginaInicial(),
    metadata: {
      titulo: 'Página Inicial',
      descricao: 'Bem-vindo à nossa aplicação',
      permissoesNecessarias: [],
      analitics: {
        pagina: 'home',
        grupo: 'principal'
      }
    }
  },
  {
    path: '/admin',
    element: () => criarPaginaAdmin(),
    metadata: {
      titulo: 'Administração',
      permissoesNecessarias: ['admin'],
      menu: {
        icone: 'settings',
        grupo: 'sistema'
      }
    }
  }
]);
```

## Lazy Loading

Para carregamento preguiçoso, use as propriedades `import` e `module`:

```javascript
Router([
  {
    path: '/dashboard',
    import: () => import('./paginas/dashboard.js'),
    module: 'DashboardPage'
  },
  {
    path: '/relatorios',
    import: () => import('./paginas/relatorios.js')
    // module omitido, usa a exportação default
  }
]);
``` 