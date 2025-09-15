---
category: State Management
categoryId: 2
articleId: 2
slug: state-basic
title: Estado Básico
description: Aprendendo a criar e gerenciar estados reativos básicos com a função State.
---

# Estado Básico

## Referência da API

### Criação

```typescript
// Sintaxe básica
const state = State(initialValue);

// Com tipagem explícita
const state = State<T>(initialValue);
```

### Métodos e Propriedades

| Método/Propriedade | Sintaxe | Descrição |
|-------------------|---------|-----------|
| `set()` | `state.set(newValue)` | Define um novo valor |
| | `state.set((current) => newValue)` | Define um valor baseado no atual |
| | `state.set(value, options)` | Define com opções de atualização |
| `get()` | `state.get()` | Retorna o valor atual |
| | `state.get(callback)` | Retorna e executa o callback |
| `value` | `state.value` | Acessa/define o valor com detecção de dependência |
| `sub()` | `state.sub(id, callback)` | Assina mudanças |
| | `state.sub(id, callback, true)` | Assina e executa imediatamente |
| `unsub()` | `state.unsub(id)` | Cancela assinatura |
| `trigger()` | `state.trigger()` | Dispara notificações para todos assinantes |
| | `state.trigger(id1, id2, ...)` | Dispara para assinantes específicos |
| `clear()` | `state.clear()` | Remove todas as assinaturas |
| | `state.clear(newValue)` | Remove assinaturas e define novo valor |

### Opções de Atualização

```typescript
// Opções disponíveis no método set
interface SetOptions {
  silent?: boolean;       // Não notifica assinantes quando true
  target?: string | string[]; // Notifica apenas assinantes específicos
}
```

## Visão Geral

O componente fundamental do sistema de gerenciamento de estado é a função `State`, que permite criar estados reativos que notificam automaticamente assinantes quando seus valores mudam.

## Criando um Estado

Para criar um estado reativo, basta chamar a função `State` com um valor inicial:

```typescript
import { State } from '@jay-js/system';

// Estado simples com valor primitivo
const count = State(0);

// Estado com objeto
const user = State({
  name: 'John',
  age: 30
});

// Estado com array
const list = State(['a', 'b', 'c']);

// Com tipagem explícita
interface Person {
  name: string;
  age: number;
}
const person = State<Person>({
  name: 'John',
  age: 30
});
```

## Acessando o Valor Atual

Existem duas formas de acessar o valor atual de um estado:

### Método `get()`

O método `get()` retorna o valor atual do estado:

```typescript
const currentCount = count.get();
console.log(currentCount); // 0

// Com callback opcional
count.get((value) => {
  console.log(`O valor atual é: ${value}`);
});
```

### Propriedade `value`

A propriedade `value` também retorna o valor atual, mas com um benefício adicional: registra automaticamente dependências para efeitos reativos:

```typescript
console.log(count.value); // 0

// Quando usado dentro de Effect ou Derived, cria automaticamente uma dependência
```

## Atualizando o Estado

O estado pode ser atualizado de várias formas:

### Método `set()`

O método `set()` atualiza o valor do estado e notifica os assinantes:

```typescript
// Atualizando diretamente com um novo valor
count.set(5);

// Atualizando com base no estado atual (imutável)
count.set((current) => current + 1);

// Ou para objetos, mantendo imutabilidade
user.set((current) => ({ ...current, age: current.age + 1 }));

// Ou modificando diretamente (mutável)
user.set((current) => {
  current.age += 1;
  return current;
});
```

### Propriedade `value`

A propriedade `value` também pode ser usada para atualizar o estado:

```typescript
count.value = 10;

// Equivalente a:
// count.set(10);
```

### Opções de Atualização

O método `set()` aceita um objeto de opções como segundo parâmetro:

```typescript
count.set(5, {
  // Não notifica os assinantes
  silent: true,
  
  // Notifica apenas um assinante específico
  target: 'mySubscriptionId',
  
  // Ou notifica vários assinantes específicos
  target: ['subscription1', 'subscription2']
});
```

## Assinando Mudanças

Para reagir a mudanças no estado, você pode assinar atualizações:

```typescript
// Assina mudanças com um ID único
count.sub('counter-display', (newValue) => {
  console.log(`Contador atualizado: ${newValue}`);
});

// Opcionalmente, execute o callback imediatamente com o valor atual
count.sub('counter-display', (newValue) => {
  console.log(`Contador atual: ${newValue}`);
}, true);
```

## Cancelando Assinaturas

Para cancelar uma assinatura quando não for mais necessária:

```typescript
count.unsub('counter-display');
```

## Disparando Atualizações Manualmente

Você pode notificar manualmente os assinantes sem alterar o valor:

```typescript
// Notifica todos os assinantes
count.trigger();

// Notifica apenas assinantes específicos
count.trigger('counter-display');
count.trigger('subscription1', 'subscription2', 'subscription3');
```

## Limpando Assinaturas

Para remover todas as assinaturas:

```typescript
// Apenas limpa as assinaturas
count.clear();

// Limpa as assinaturas e define um novo valor
count.clear(10);
```

## Exemplo Completo

```typescript
import { State } from '@jay-js/system';

// Cria um estado para um contador
const counter = State(0);

// Assina mudanças para atualizar a UI
counter.sub('display', (value) => {
  document.getElementById('counter').textContent = String(value);
}, true);

// Funções para incrementar/decrementar
function increment() {
  counter.set((current) => current + 1);
}

function decrement() {
  counter.set((current) => current - 1);
}

// Exemplo de uso em evento de botão
document.getElementById('increment').addEventListener('click', increment);
document.getElementById('decrement').addEventListener('click', decrement);

// Limpa ao desmontar o componente
function cleanup() {
  counter.unsub('display');
}
```