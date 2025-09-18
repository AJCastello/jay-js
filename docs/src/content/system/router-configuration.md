---
category: Roteamento
categoryId: 1
articleId: 2
slug: router-configuration
title: Configuração do Router
description: Aprenda como configurar o router para sua aplicação e personalizar seu comportamento.
---

# Configuração do Router

## Referência da API

### Inicialização

```typescript
Router(routes: Array<TRoute>, options?: TRouterOptions): void
```

### Configuração Independente

```typescript
routerDefineOptions(options: Partial<TRouterOptions>): void
```

### Parâmetros

#### TRouterOptions

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `prefix` | `string` | Prefixo de URL a ser adicionado a todas as rotas |
| `target` | `HTMLElement \| string` | Elemento DOM ou seletor padrão onde as rotas serão renderizadas |
| `onError` | `(error: Error) => void` | Função para tratamento de erros |
| `beforeResolve` | `(route: TRouteInstance) => boolean \| Promise<boolean>` | Função chamada antes de resolver uma rota. Pode cancelar a navegação retornando false |

## Configuração Básica

A função `Router` aceita dois parâmetros:

1. Um array de configurações de rota
2. Um objeto de opções opcional

```javascript
import { Router } from '@jay-js/system';

Router([
  // Definições de rotas aqui
], {
  // Opções de configuração aqui
  prefix: '/app',
  target: '#conteudo-principal',
  onError: (erro) => console.error('Erro no router:', erro)
});
```

## Opções de Configuração

### Prefixo de URL

O `prefix` permite definir um prefixo para todas as rotas da aplicação. Isso é útil quando sua aplicação não está na raiz do domínio:

```javascript
Router(routes, {
  prefix: '/dashboard'
});

// Agora a rota '/usuarios' será acessível em '/dashboard/usuarios'
```

### Elemento Alvo

O `target` define onde o conteúdo das rotas será renderizado. Pode ser:

- Um seletor CSS como string (ex: '#app')
- Uma referência direta a um elemento DOM

```javascript
Router(routes, {
  target: document.getElementById('app') // Referência direta
});

// OU

Router(routes, {
  target: '#conteudo-principal' // Seletor CSS
});
```

### Tratamento de Erros

A opção `onError` permite definir um manipulador personalizado para erros de roteamento:

```javascript
Router(routes, {
  onError: (erro) => {
    console.error('Erro de roteamento:', erro);
    mostrarNotificacao('Ocorreu um erro ao navegar');
  }
});
```

### Função Before Resolve

A opção `beforeResolve` permite executar lógica antes que qualquer rota seja resolvida:

```javascript
Router(routes, {
  beforeResolve: (rota) => {
    // Verificar autenticação global
    const usuarioLogado = verificarAutenticacao();
    if (!usuarioLogado && rota.path !== '/login') {
      Navigate('/login');
      return false; // Impede a navegação original
    }
    return true; // Permite a navegação
  }
});
```

## Configuração Independente

Você pode configurar o router separadamente da inicialização usando `routerDefineOptions`:

```javascript
import { routerDefineOptions } from '@jay-js/system';

// Em algum lugar do seu código de configuração
routerDefineOptions({
  prefix: '/app',
  target: '#conteudo'
});

// Em outro lugar ou arquivo
import { Router } from '@jay-js/system';

Router([
  // Rotas aqui
]);
```

Isso é útil quando:

- Você precisa separar a configuração do router da definição de rotas
- Deseja modificar as opções do router dinamicamente durante o ciclo de vida da aplicação
- Tem diferentes módulos responsáveis pela configuração e definição de rotas

## Exemplo Completo

```javascript
import { Router, routerDefineOptions } from '@jay-js/system';

// Configuração do router
routerDefineOptions({
  prefix: '/minha-app',
  target: '#principal',
  onError: (erro) => {
    console.error('Erro de navegação:', erro);
    exibirPaginaDeErro(erro);
  },
  beforeResolve: async (rota) => {
    // Verificar permissões
    if (rota.metadata?.requerPermissao) {
      const temPermissao = await verificarPermissao(rota.metadata.requerPermissao);
      if (!temPermissao) {
        exibirMensagem('Acesso negado');
        return false;
      }
    }
    return true;
  }
});

// Definição das rotas
Router([
  // Rotas definidas aqui
]);
```