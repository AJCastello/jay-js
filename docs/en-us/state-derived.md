---
category: State Management
categoryId: 2
articleId: 5
slug: state-derived
title: Estados Derivados
description: Aprenda a usar Derived para criar estados que se recalculam automaticamente com base em outros estados.
---

# Estados Derivados

## Referência da API

### Criação

```typescript
// Sintaxe básica
const derivedState = Derived(computeFn);

// Com tipagem explícita
const derivedState = Derived<T>(() => computedValue);
```

### Parâmetros

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `computeFn` | `() => T` | Função que calcula o valor derivado; as dependências são automaticamente detectadas |

### Métodos e Propriedades

Estados derivados incluem todos os métodos de um estado básico:

| Método/Propriedade | Sintaxe | Descrição |
|-------------------|---------|-----------|
| `get()` | `derivedState.get()` | Retorna o valor derivado atual |
| `value` | `derivedState.value` | Acessa o valor com detecção de dependência |
| `set()` | `derivedState.set(newValue)` | Define manualmente um valor (sobrescreve o cálculo) |
| | `derivedState.set(current => newValue)` | Define com base no valor atual |
| `sub()` | `derivedState.sub(id, callback)` | Assina mudanças |
| `unsub()` | `derivedState.unsub(id)` | Cancela assinatura |
| `trigger()` | `derivedState.trigger()` | Dispara notificações manualmente |
| `clear()` | `derivedState.clear()` | Remove assinaturas |

### Comportamento Especial

- **Recálculo automático**: Valor recalculado sempre que qualquer dependência muda
- **Detecção automática de dependências**: As dependências são rastreadas automaticamente através da propriedade `value`
- **Dependências aninhadas**: Pode depender de outros estados derivados
- **Computação preguiçosa**: Só recalcula quando seu valor é acessado após uma mudança de dependência

## Visão Geral

A função `Derived` permite criar estados que calculam seu valor automaticamente a partir de outros estados. Quando qualquer um dos estados dependentes muda, o estado derivado é recalculado automaticamente.

## Criando Estados Derivados

Para criar um estado derivado, use a função `Derived` com uma função que calcula o valor derivado:

```typescript
import { State, Derived } from '@jay-js/system';

// Estados de origem
const count = State(10);
const factor = State(2);

// Estado derivado que se recalcula automaticamente
const doubled = Derived(() => count.value * factor.value);

console.log(doubled.get()); // 20

// Quando count ou factor mudam, doubled é atualizado automaticamente
count.set(5);
console.log(doubled.get()); // 10

factor.set(3);
console.log(doubled.get()); // 15
```

## Como Funciona

Quando você cria um estado derivado:

1. A função de cálculo é executada imediatamente para definir o valor inicial
2. As dependências são rastreadas automaticamente através do acesso à propriedade `.value`
3. Quando qualquer estado dependente muda, a função de cálculo é executada novamente
4. O estado derivado é atualizado com o novo valor calculado

## Dependências Automáticas

As dependências são detectadas automaticamente quando você acessa a propriedade `.value` de outros estados dentro da função de cálculo:

```typescript
// Este estado derivado depende automaticamente de firstName e lastName
const fullName = Derived(() => {
  return `${firstName.value} ${lastName.value}`;
});

// Este estado derivado depende de múltiplos estados
const userSummary = Derived(() => {
  return {
    name: `${firstName.value} ${lastName.value}`,
    isAdult: age.value >= 18,
    preferences: preferences.value
  };
});
```

## Acessando Valores

Você pode acessar o valor de um estado derivado como qualquer outro estado:

```typescript
// Via método get()
const result = doubled.get();

// Via propriedade value (registra dependência automaticamente)
console.log(doubled.value);
```

## Cálculos Complexos

Estados derivados podem conter lógica complexa e dependências condicionais:

```typescript
import { State, Derived } from '@jay-js/system';

const items = State([1, 2, 3, 4, 5]);
const filterEnabled = State(false);
const threshold = State(3);

// Estado derivado com lógica condicional
const processedItems = Derived(() => {
  let result = items.value;
  
  // Aplica filtro condicionalmente
  if (filterEnabled.value) {
    result = result.filter(item => item > threshold.value);
  }
  
  // Calcula algumas estatísticas
  const stats = {
    items: result,
    count: result.length,
    sum: result.reduce((a, b) => a + b, 0),
    average: result.length > 0 
      ? result.reduce((a, b) => a + b, 0) / result.length 
      : 0
  };
  
  return stats;
});

// Inicialmente
console.log(processedItems.value);
// { items: [1, 2, 3, 4, 5], count: 5, sum: 15, average: 3 }

// Ativando o filtro
filterEnabled.set(true);
console.log(processedItems.value);
// { items: [4, 5], count: 2, sum: 9, average: 4.5 }

// Mudando o threshold
threshold.set(4);
console.log(processedItems.value);
// { items: [5], count: 1, sum: 5, average: 5 }
```

## Estados Derivados Aninhados

Você pode usar estados derivados que dependem de outros estados derivados:

```typescript
const count = State(10);
const doubled = Derived(() => count.value * 2);
const quadrupled = Derived(() => doubled.value * 2);

console.log(quadrupled.get()); // 40

count.set(15);
console.log(doubled.get()); // 30
console.log(quadrupled.get()); // 60
```

## Atualizando Estados Derivados Manualmente

Embora o principal objetivo dos estados derivados seja o cálculo automático, você também pode atualizá-los manualmente:

```typescript
const count = State(10);
const doubled = Derived(() => count.value * 2);

// Estado inicial calculado
console.log(doubled.get()); // 20

// Atualização manual (sobrescreve o valor calculado)
doubled.set(50);
console.log(doubled.get()); // 50

// Quando uma dependência muda, o valor é recalculado
count.set(15);
console.log(doubled.get()); // 30 (e não 50)
```

## Exemplo de Caso de Uso: Filtrando e Ordenando Lista

```typescript
import { State, Derived } from '@jay-js/system';

// Estado original da lista
const products = State([
  { id: 1, name: 'Laptop', price: 1200, category: 'electronics' },
  { id: 2, name: 'Headphones', price: 100, category: 'electronics' },
  { id: 3, name: 'Book', price: 15, category: 'books' },
  { id: 4, name: 'Smartphone', price: 800, category: 'electronics' }
]);

// Estados de filtros e ordenação
const categoryFilter = State('all'); // 'all' ou nome da categoria
const searchQuery = State('');
const sortBy = State('name'); // 'name', 'price'
const sortDirection = State('asc'); // 'asc', 'desc'

// Lista filtrada e ordenada derivada 
const filteredProducts = Derived(() => {
  let result = [...products.value];
  
  // Aplicar filtro de categoria
  if (categoryFilter.value !== 'all') {
    result = result.filter(product => 
      product.category === categoryFilter.value
    );
  }
  
  // Aplicar filtro de busca
  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(product => 
      product.name.toLowerCase().includes(query)
    );
  }
  
  // Aplicar ordenação
  result.sort((a, b) => {
    const factor = sortDirection.value === 'asc' ? 1 : -1;
    const field = sortBy.value;
    
    if (a[field] < b[field]) return -1 * factor;
    if (a[field] > b[field]) return 1 * factor;
    return 0;
  });
  
  return result;
});

// Usar o estado derivado
function renderProductList() {
  const items = filteredProducts.value;
  console.log(`Mostrando ${items.length} produtos:`);
  items.forEach(product => {
    console.log(`- ${product.name}: $${product.price}`);
  });
}

// Renderiza inicialmente
renderProductList();

// Quando qualquer filtro ou ordenação muda, a lista é recalculada automaticamente
categoryFilter.set('electronics');
searchQuery.set('ph');
sortBy.set('price');
sortDirection.set('desc');

// A lista é recalculada e pode ser renderizada novamente
renderProductList();
```