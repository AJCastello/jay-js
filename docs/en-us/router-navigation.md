---
category: Roteamento
categoryId: 1
articleId: 3
slug: router-navigation
title: Navegação com o Router
description: Aprenda como navegar entre rotas, obter parâmetros e implementar guardas de navegação.
---

# Navegação com o Router

## Referência da API

### Funções de Navegação

```typescript
// Navegar para uma rota
Navigate(path: string): void

// Registrar guarda de navegação
beforeNavigate(guardFn: () => boolean | Promise<boolean>): () => void

// Obter parâmetros da rota atual
getParams(): Record<string, string>
```

## Navegação Programática

A função `Navigate` permite navegar programaticamente para qualquer rota na aplicação sem recarregar a página:

```javascript
import { Navigate } from '@jay-js/system';

// Navegar para a página inicial
Navigate('/');

// Navegar para uma página de usuário com parâmetro
Navigate('/usuarios/123');

// Navegar com parâmetros de consulta
Navigate('/produtos?categoria=eletronicos&ordem=preco');
```

### Tratamento de Prefixos

Se o router estiver configurado com um prefixo, você não precisa incluí-lo ao usar `Navigate`:

```javascript
// Com o router configurado com prefix: '/app'
Router(routes, { prefix: '/app' });

// Isso navegará para '/app/perfil'
Navigate('/perfil');
```

## Links de Navegação

Para criar links de navegação que usam o router em vez de causar recarregamento da página:

```javascript
// Em JavaScript
document.querySelectorAll('a[data-nav]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    Navigate(link.getAttribute('href'));
  });
});

// Em HTML
<a href="/sobre" data-nav>Sobre Nós</a>
<a href="/contato" data-nav>Contato</a>
```

## Obtendo Parâmetros de Rota

A função `getParams` permite obter os parâmetros da URL atual, incluindo:

- Parâmetros de rota (definidos com `:parametro` na definição da rota)
- Parâmetros de consulta (query string)

```javascript
import { getParams } from '@jay-js/system';

// Para uma rota '/usuarios/:id' e URL '/usuarios/123?filtro=ativo'
function PaginaUsuario() {
  const { id, filtro } = getParams();
  // id = '123', filtro = 'ativo'
  
  // Usar esses parâmetros para carregar dados ou personalizar a UI
  carregarDadosDoUsuario(id);
  
  // ...resto do código...
}
```

### Exemplos Comuns

```javascript
// Para a rota '/posts/:postId/comentarios/:comentarioId'
// URL: '/posts/42/comentarios/7'
const { postId, comentarioId } = getParams();
// postId = '42', comentarioId = '7'

// Para URL com múltiplos parâmetros de consulta
// URL: '/produtos?categoria=eletronicos&ordem=preco&pagina=2'
const { categoria, ordem, pagina } = getParams();
// categoria = 'eletronicos', ordem = 'preco', pagina = '2'
```

## Guardas de Navegação

A função `beforeNavigate` permite registrar uma lógica que será executada antes da próxima tentativa de navegação.

```javascript
import { beforeNavigate, Navigate } from '@jay-js/system';

// Detectar alterações não salvas em um formulário
let formularioAlterado = false;

document.querySelector('form').addEventListener('input', () => {
  formularioAlterado = true;
});

document.querySelector('form').addEventListener('submit', () => {
  formularioAlterado = false; // Resetar após envio
});

// Registrar o guarda de navegação
const removerGuarda = beforeNavigate(() => {
  if (formularioAlterado) {
    return confirm('Você tem alterações não salvas. Deseja sair desta página?');
  }
  return true; // Permitir navegação
});

// Quando não for mais necessário
function limparGuardas() {
  removerGuarda();
}
```

### Guardas Assíncronos

Os guardas de navegação também podem ser assíncronos:

```javascript
beforeNavigate(async () => {
  try {
    // Verificar se há uploads em andamento
    const uploadsCompletos = await verificarUploads();
    if (!uploadsCompletos) {
      return confirm('Uploads em andamento. Deseja interromper?');
    }
    return true;
  } catch (erro) {
    console.error('Erro ao verificar estado de uploads', erro);
    return true; // Permitir navegação em caso de erro
  }
});
```

## Navegação Imperativa vs Declarativa

O @jay-js/system suporta tanto navegação imperativa (usando a função `Navigate`) quanto declarativa (usando links com interceptação).

### Imperativa (programática)

```javascript
// Navegação após uma ação do usuário
document.getElementById('botao-salvar').addEventListener('click', async () => {
  const sucesso = await salvarDados();
  if (sucesso) {
    Navigate('/dashboard');
  }
});

// Navegação baseada em lógica condicional
function verificarAcesso() {
  if (!usuarioAutenticado) {
    Navigate('/login');
    return false;
  }
  return true;
}
```

### Declarativa (baseada em links)

```javascript
// Função auxiliar para configurar links de navegação
function configurarLinks() {
  document.querySelectorAll('a[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      Navigate(link.getAttribute('href'));
    });
  });
}
``` 