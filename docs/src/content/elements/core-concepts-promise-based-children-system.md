---
category: Core Concepts
categoryId: 3
articleId: 4
slug: core-concepts-promise-based-children-system
title: Sistema de Children Baseado em Promises
description: Carregamento assíncrono de conteúdo, exemplos com fetch, timeouts e renderização condicional, suporte para conteúdo misto e estados de carregamento.
---

# Sistema de Children Baseado em Promises

## Como o carregamento assíncrono de conteúdo funciona

O @jay-js/elements possui suporte nativo para conteúdo assíncrono através de Promises. Quando você passa uma Promise como child, o sistema:

1. **Cria um placeholder**: Insere `<jayjs-lazy-slot>` temporariamente
2. **Aguarda resolução**: Monitora a Promise em background
3. **Substitui conteúdo**: Troca o placeholder pelo conteúdo real quando disponível
4. **Trata erros**: Captura e loga erros automaticamente

```typescript
// Children síncronos tradicionais
const elementoSimples = Base({
  children: "Texto imediato"
});

// Children assíncronos com Promise
const elementoAssincrono = Base({
  children: fetch("/api/dados")
    .then(response => response.text())
    .then(texto => documento.createTextNode(texto))
});
```

## Exemplos com fetch, timeouts, renderização condicional

### Carregamento de dados externos
```typescript
async function criarListaProdutos() {
  return Base({
    tag: "ul",
    className: "lista-produtos",
    children: fetch("/api/produtos")
      .then(response => response.json())
      .then(produtos => {
        // Criar elementos da lista dinamicamente
        return produtos.map(produto => Base({
          tag: "li",
          className: "produto-item",
          children: [
            Base({ tag: "h3", children: produto.nome }),
            Base({ tag: "p", children: produto.descricao }),
            Base({ 
              tag: "span", 
              className: "preco",
              children: `R$ ${produto.preco}` 
            })
          ]
        }));
      })
  });
}
```

### Delays e animações
```typescript
const elementoComDelay = Base({
  tag: "div",
  className: "container",
  children: [
    "Carregando",
    // Conteúdo aparece após 2 segundos
    new Promise(resolve => 
      setTimeout(() => {
        resolve(Base({
          tag: "p",
          className: "conteudo-carregado fade-in",
          children: "Conteúdo carregado com sucesso!"
        }));
      }, 2000)
    )
  ]
});
```

### Renderização condicional baseada em estado
```typescript
function criarElementoCondicional(usuarioLogado: boolean) {
  return Base({
    tag: "header",
    children: [
      Base({ tag: "h1", children: "Minha App" }),
      // Conteúdo condicional assíncrono
      Promise.resolve(usuarioLogado).then(logado => 
        logado 
          ? Base({ 
              tag: "nav", 
              children: "Menu do usuário" 
            })
          : Base({ 
              tag: "div", 
              children: "Faça login" 
            })
      )
    ]
  });
}
```

## Conteúdo misto (strings, nodes, promises)

O sistema suporta qualquer combinação de tipos de children:

```typescript
const elementoMisto = Base({
  tag: "article",
  children: [
    // String
    "Início do artigo",
    
    // Node síncrono
    Base({ tag: "h2", children: "Seção 1" }),
    
    // Promise de string
    fetch("/api/introducao").then(r => r.text()),
    
    // Promise de Node
    carregarImagem("/imagem.jpg").then(img => img),
    
    // Array misto
    [
      "Mais texto",
      Base({ tag: "p", children: "Parágrafo" }),
      Promise.resolve("Texto assíncrono")
    ],
    
    // String final
    "Fim do artigo"
  ]
});
```

## Estados de carregamento e tratamento de erros

### Implementação de loading states
```typescript
function criarElementoComLoading() {
  let loadingElement: HTMLElement;
  
  return Base({
    tag: "div",
    className: "container",
    onmount: (el) => {
      // Criar indicador de loading
      loadingElement = Base({
        tag: "div",
        className: "loading-spinner",
        children: "Carregando..."
      });
      el.appendChild(loadingElement);
    },
    children: fetch("/api/dados")
      .then(response => {
        // Remover loading
        if (loadingElement) {
          loadingElement.remove();
        }
        return response.text();
      })
      .then(dados => Base({
        tag: "div",
        className: "dados-carregados",
        children: dados
      }))
      .catch(erro => {
        // Remover loading em caso de erro
        if (loadingElement) {
          loadingElement.remove();
        }
        return Base({
          tag: "div",
          className: "erro",
          children: `Erro ao carregar: ${erro.message}`
        });
      })
  });
}
```

### Tratamento robusto de erros
```typescript
// Sistema interno de tratamento de erros
function appendChildToBase(base: HTMLElement, child: Promise<Node>) {
  const elementSlot = document.createElement("jayjs-lazy-slot");
  base.appendChild(elementSlot);
  
  child
    .then((resolvedChild) => {
      if (resolvedChild && typeof resolvedChild !== "boolean") {
        elementSlot.replaceWith(resolvedChild);
      } else {
        // Remover slot se não há conteúdo válido
        elementSlot.remove();
      }
    })
    .catch((error) => {
      console.error("Failed to resolve child promise:", error);
      
      // Substituir por indicador de erro em desenvolvimento
      if (process.env.NODE_ENV === "development") {
        const errorElement = document.createElement("div");
        errorElement.style.cssText = "color: red; border: 1px solid red; padding: 8px;";
        errorElement.textContent = `Erro: ${error.message}`;
        elementSlot.replaceWith(errorElement);
      } else {
        // Apenas remover slot em produção
        elementSlot.remove();
      }
    });
}
```