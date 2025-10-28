---
category: JSX
categoryId: 5
articleId: 3
slug: jsx-runtime
title: Runtime JSX
description: Entenda o funcionamento interno do runtime JSX e como ele transforma o código JSX em elementos DOM no Jay JS.
---

# Runtime JSX

## Referência da API

### Funções de Runtime JSX

```typescript
// Runtime de produção
function jsx(
  tag: string | Function,
  props: JSXProps
): HTMLElement | Promise<HTMLElement>;

// Runtime de desenvolvimento
function jsxDEV(
  tag: string | Function,
  props: JSXProps,
  key: string | null,
  isStaticChildren: boolean,
  source: any,
  self: any
): HTMLElement | Promise<HTMLElement>;

// Função JSX alternativa (semelhante à implementação React)
function jayJSX(
  tag: string | Function,
  props: JSXProps,
  ...children: any[]
): HTMLElement | Promise<HTMLElement>;
```

### Interfaces de Tipo

```typescript
// Interface para props JSX
interface JSXProps {
  [key: string]: any;
  children?: any[] | any;
}

// Tipo para funções componentes
type JSXComponent = (props: JSXProps) => HTMLElement | Promise<HTMLElement>;
```

## Visão Geral

O runtime JSX é o coração do pacote `@jay-js/jsx`, responsável por transformar as expressões JSX em elementos DOM reais ou componentes funcionais. Quando você escreve código JSX, o compilador (TypeScript, Babel, ou outro) converte esse código em chamadas para as funções do runtime JSX.

Este artigo explora como o runtime JSX funciona internamente e como ele se integra com o resto do ecossistema Jay JS.

## Como o JSX é Transformado

Quando você escreve código JSX como:

```jsx
<div className="container">
  <h1>Olá, Mundo!</h1>
  <p>Este é um exemplo de JSX</p>
</div>
```

O compilador transforma isso em:

```js
jsx("div", {
  className: "container",
  children: [
    jsx("h1", { children: "Olá, Mundo!" }),
    jsx("p", { children: "Este é um exemplo de JSX" })
  ]
});
```

Essas chamadas à função `jsx()` são então processadas pelo runtime para criar elementos DOM reais.

## Funções do Runtime JSX

O pacote `@jay-js/jsx` fornece várias funções de runtime para diferentes contextos:

### jsx()

A função principal usada em ambiente de produção:

```typescript
function jsx(tag, props): HTMLElement | Promise<HTMLElement>
```

Parâmetros:
- `tag`: Tag HTML (string) ou função componente
- `props`: Objeto contendo propriedades do elemento, incluindo `children`

Esta função determina se está criando um elemento HTML ou executando um componente funcional:
- Se `tag` for uma string, cria um elemento HTML usando a função `Base` do `@jay-js/ui`
- Se `tag` for uma função, executa-a passando as props

### jsxDEV()

Versão de desenvolvimento da função `jsx()`:

```typescript
function jsxDEV(
  tag,
  props,
  key,
  isStaticChildren,
  source,
  self
): HTMLElement | Promise<HTMLElement>
```

Esta versão inclui parâmetros adicionais úteis para desenvolvimento:
- `key`: Identificador único para o elemento (usado em listas)
- `isStaticChildren`: Flag que indica se os children são estáticos
- `source` e `self`: Informações para ferramentas de desenvolvimento e depuração

### jayJSX()

Uma implementação alternativa que aceita children como parâmetros separados:

```typescript
function jayJSX(
  tag,
  props,
  ...children
): HTMLElement | Promise<HTMLElement>
```

Esta função é mais similar à implementação original do React e pode ser usada em alguns contextos específicos.

## Integração com o Sistema de UI

O runtime JSX se integra diretamente com o pacote `@jay-js/ui` através da função `Base`, que é responsável por criar elementos DOM concretos. Esta função:

1. Cria um elemento DOM usando `document.createElement()`
2. Aplica atributos e eventos do objeto `props`
3. Adiciona elementos children, transformando-os em nós DOM quando necessário
4. Retorna o elemento DOM resultante

Por exemplo, quando você chama:

```js
jsx("div", { className: "container", onClick: handleClick, children: "Texto" })
```

O runtime JSX:
1. Cria um elemento `<div>`
2. Define sua classe para "container"
3. Adiciona um event listener de click 
4. Insere o texto "Texto" como conteúdo
5. Retorna o elemento DOM criado

## Componentes Funcionais

Quando a `tag` passada para `jsx()` é uma função, o runtime executa essa função com as props fornecidas:

```jsx
function MeuComponente({ nome, idade }) {
  return (
    <div>
      <p>Nome: {nome}</p>
      <p>Idade: {idade}</p>
    </div>
  );
}

// Uso do componente
const elemento = <MeuComponente nome="Maria" idade={30} />;
```

Durante a transformação JSX, isso se torna:

```js
function MeuComponente({ nome, idade }) {
  return jsx("div", {
    children: [
      jsx("p", { children: ["Nome: ", nome] }),
      jsx("p", { children: ["Idade: ", idade] })
    ]
  });
}

// Uso do componente
const elemento = jsx(MeuComponente, { nome: "Maria", idade: 30 });
```

O runtime detecta que `MeuComponente` é uma função e a executa, passando as props como argumentos.

## Suporte a Assincronicidade

Uma característica importante do runtime JSX do Jay JS é o suporte nativo a componentes assíncronos. As funções do runtime retornam `HTMLElement | Promise<HTMLElement>`, permitindo componentes que realizam operações assíncronas:

```jsx
async function ComponenteAssincrono({ id }) {
  const dados = await fetchDados(id);
  return (
    <div>
      <h2>{dados.titulo}</h2>
      <p>{dados.descricao}</p>
    </div>
  );
}
```

O runtime lida automaticamente com as Promises retornadas pelos componentes, tornando a construção de interfaces com dados assíncronos mais simples.

## Diferenças entre Ambiente de Produção e Desenvolvimento

O runtime JSX tem comportamentos ligeiramente diferentes entre os ambientes:

### Produção (`jsx`)
- Mais otimizado e com menos overhead
- Menos verificações e validações para melhor performance
- Não inclui informações de debugging

### Desenvolvimento (`jsxDEV`)
- Fornece mais informações para ferramentas de desenvolvimento
- Inclui validações adicionais para detectar problemas comuns
- Melhora a experiência de depuração

A versão correta é automaticamente selecionada pelos sistemas de build como o Vite quando você configura seu ambiente.

## Considerações de Performance

O runtime JSX do Jay JS foi projetado para ser eficiente, mas há algumas considerações importantes:

- **Reutilização de elementos**: Para melhor performance, evite recriar elementos unnecessariamente
- **Componentes complexos**: Divida interfaces complexas em componentes menores
- **Atualizações condicionais**: Use renderização condicional com cuidado para evitar recriações desnecessárias

No próximo artigo, exploraremos mais a fundo os componentes e fragmentos, que são partes essenciais para construir interfaces eficientes com JSX. 