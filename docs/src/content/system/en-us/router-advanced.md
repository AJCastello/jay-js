---
category: Roteamento
categoryId: 1
articleId: 5
slug: router-advanced
title: Recursos Avançados do Router
description: Explore recursos avançados do router como lazy loading, guardas de rota, padrões de caminho complexos e integração com outros módulos.
---

# Recursos Avançados do Router

## Referência da API

### Lazy Loading

```typescript
// Definição de rota com lazy loading
{
  path: string;
  import: () => Promise<any>;
  module?: string;
  params?: Record<string, any>;
  loader?: HTMLElement;
}
```

### Padrões de Caminho

O router utiliza a biblioteca path-to-regexp que suporta vários padrões de correspondência:

- Parâmetros nomeados: `/usuarios/:id`
- Parâmetros opcionais: `/arquivos/:tipo?`
- Parâmetros com restrições: `/usuarios/:id(\\d+)`
- Curingas: `/arquivos/*`
- Parâmetros customizados: `/itens/:id{\\d+}`

## Carregamento Preguiçoso (Lazy Loading)

O router suporta carregamento preguiçoso de componentes, permitindo que você carregue módulos apenas quando necessário:

```javascript
Router([
  {
    path: '/dashboard',
    import: () => import('./paginas/dashboard.js'),
    module: 'DashboardPage',
    loader: criarElementoLoader() // Opcional: elemento a ser mostrado durante o carregamento
  },
  {
    path: '/configuracoes',
    import: () => import('./paginas/configuracoes.js')
    // Usa a exportação default do módulo
  }
]);
```

### Parâmetros para Módulos Lazy

Você pode passar parâmetros adicionais para módulos lazy usando a propriedade `params`:

```javascript
Router([
  {
    path: '/admin/estatisticas',
    import: () => import('./modules/estatisticas.js'),
    module: 'EstatisticasView',
    params: {
      tipoGrafico: 'barras',
      periodoInicial: 'ultimo-mes',
      atualizacaoAutomatica: true
    }
  }
]);
```

## Guardas de Rota Avançadas

As guardas de rota permitem controle granular sobre o acesso às rotas:

```javascript
Router([
  {
    path: '/perfil',
    element: () => criarPaginaPerfil(),
    guard: async () => {
      const autenticado = await verificarAutenticacao();
      if (!autenticado) {
        // Redirecionamento
        Navigate('/login?redirecionamento=' + encodeURIComponent(window.location.pathname));
        return false;
      }
      return true;
    }
  },
  {
    path: '/organizacao/:orgId',
    element: () => criarPaginaOrganizacao(),
    guard: async (rota) => {
      try {
        const { orgId } = getParams();
        const permissao = await verificarPermissaoOrganizacao(orgId);
        
        if (!permissao.acesso) {
          mostrarNotificacao(permissao.mensagem || 'Acesso negado');
          Navigate('/dashboard');
          return false;
        }
        
        // Adicionar dados da permissão ao contexto para uso posterior
        rota.metadata = {
          ...rota.metadata,
          permissoes: permissao.nivel
        };
        
        return true;
      } catch (erro) {
        console.error('Erro ao verificar permissões', erro);
        mostrarNotificacao('Erro ao verificar permissões');
        return false;
      }
    }
  }
]);
```

## Padrões de Caminho Avançados

O router suporta padrões de caminho complexos:

```javascript
Router([
  // Parâmetros com padrões específicos
  {
    path: '/usuarios/:id(\\d+)',
    element: () => criarPaginaUsuario()
    // Corresponde a '/usuarios/123' mas não a '/usuarios/abc'
  },
  
  // Múltiplos parâmetros opcionais
  {
    path: '/blog/:ano?/:mes?/:dia?',
    element: () => criarPaginaBlog()
    // Corresponde a '/blog', '/blog/2023', '/blog/2023/04', '/blog/2023/04/15'
  },
  
  // Capturando caminhos restantes com curinga
  {
    path: '/docs/*',
    element: () => criarPaginaDocumentacao()
    // Corresponde a qualquer caminho que comece com '/docs/'
  },
  
  // Parâmetros personalizados complexos
  {
    path: '/arquivos/:nome{.*}',
    element: () => criarVisualizadorArquivos()
    // Captura qualquer texto após '/arquivos/' como parâmetro 'nome'
  }
]);
```

## Integração com Outros Módulos

### Integração com LazyModule

O router integra-se perfeitamente com o sistema de módulos preguiçosos do LazyModule:

```javascript
import { Router, LazyModule, setLazyOptions } from '@jay-js/system';

// Configurar opções globais do LazyModule
setLazyOptions({
  baseUrl: '/modulos/',
  defaultLoader: criarLoaderGlobal()
});

// Usar com o router
Router([
  {
    path: '/dashboard',
    import: () => LazyModule('dashboard'),
    module: 'DashboardView'
  },
  {
    path: '/relatorios',
    import: () => LazyModule('relatorios/principal'),
    params: {
      formato: 'tabela'
    }
  }
]);
```

### Integração com Sistema de Estado

Combine o router com o sistema de estado para criar aplicações reativas:

```javascript
import { Router, Navigate, State, Derived } from '@jay-js/system';

// Estado global de autenticação
const usuarioAtual = State(null);
const autenticado = Derived(() => !!usuarioAtual.value);

// Router com guardas baseadas no estado
Router([
  {
    path: '/protegido',
    element: () => criarPaginaProtegida(),
    guard: () => {
      if (!autenticado.value) {
        Navigate('/login');
        return false;
      }
      return true;
    }
  }
]);

// Reagir a mudanças de autenticação
usuarioAtual.sub('auth-checker', (usuario) => {
  if (usuario && window.location.pathname === '/login') {
    Navigate('/dashboard');
  } else if (!usuario && window.location.pathname.startsWith('/admin')) {
    Navigate('/login');
  }
});
```

## Integração com Sistemas de Tema

Utilize o router para alternar entre temas baseado na rota:

```javascript
import { Router, beforeNavigate } from '@jay-js/system';

// Sistema de temas
const temas = {
  claro: {
    background: '#ffffff',
    text: '#333333'
  },
  escuro: {
    background: '#222222',
    text: '#eeeeee'
  },
  admin: {
    background: '#1a2233',
    text: '#ffffff',
    accent: '#ff5722'
  }
};

// Definir tema por rota
const temaPorRota = {
  '/admin': 'admin',
  '/marketing': 'claro',
  '/suporte': 'escuro'
};

// Registrar guarda de navegação para temas
beforeNavigate(() => {
  const caminho = window.location.pathname;
  const temaBase = Object.keys(temaPorRota).find(rota => caminho.startsWith(rota));
  
  if (temaBase) {
    aplicarTema(temas[temaPorRota[temaBase]]);
  } else {
    // Tema padrão
    aplicarTema(temas.claro);
  }
  
  return true; // Sempre permitir navegação
});

// Função para aplicar tema
function aplicarTema(tema) {
  Object.keys(tema).forEach(prop => {
    document.documentElement.style.setProperty(`--${prop}`, tema[prop]);
  });
}

// Inicializar router
Router([
  // Definição de rotas
]);
``` 