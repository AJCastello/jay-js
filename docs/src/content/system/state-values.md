---
category: State
categoryId: 2
articleId: 7
slug: state-values
title: Valores Reativos
description: Aprenda a usar a função Values para definir valores em objetos de forma reativa.
---

# Valores Reativos

A função `Values` é uma ferramenta poderosa que permite definir valores em objetos de forma reativa. Quando um estado acessado dentro da função muda, o valor é automaticamente recalculado e atribuído ao objeto alvo.

## Criando Valores Reativos

Para criar um setter de valores reativos, use a função `Values` com uma função que calcula o valor:

```typescript
import { State, Values } from '@jay-js/system';

// Estados fonte
const count = State(10);

// Cria um setter reativo
const setValue = Values(() => count.value * 2);

// Define o valor em um objeto
const target = {};
setValue(target, 'doubled');

console.log(target); // { doubled: 20 }

// Quando o estado muda, o objeto é atualizado automaticamente
count.set(15);
console.log(target); // { doubled: 30 }
```

## Como Funciona

Quando você usa a função `Values`:

1. Cria-se um setter que aceita um objeto alvo e um caminho de propriedade
2. Quando chamado, o setter registra um efeito reativo no objeto alvo
3. O efeito executa a função fornecida para calcular o valor inicial
4. Quando qualquer estado acessado na função muda, o valor é recalculado automaticamente
5. O novo valor é atribuído ao objeto alvo no caminho especificado

## Atualizando Propriedades Aninhadas

Você pode facilmente atualizar propriedades aninhadas em objetos:

```typescript
import { State, Values } from '@jay-js/system';

const name = State('John');
const target = { user: {} };

// Define um valor em um caminho aninhado
const setValue = Values(() => name.value);
setValue(target, 'user', 'name');

console.log(target); // { user: { name: 'John' } }

// Quando o nome muda, o objeto aninhado é atualizado
name.set('Jane');
console.log(target); // { user: { name: 'Jane' } }
```

A função `Values` criará automaticamente objetos aninhados se eles não existirem:

```typescript
const count = State(10);
const target = {};

const setValue = Values(() => count.value);
setValue(target, 'stats', 'counter', 'value');

console.log(target);
// { stats: { counter: { value: 10 } } }
```

## Usando com Estados

Você também pode definir valores em objetos de estado:

```typescript
import { State, Values } from '@jay-js/system';

const source = State(10);
const target = State(0);

const setValue = Values(() => source.value * 2);
setValue(target, 'value');

console.log(target.get()); // 20

source.set(15);
console.log(target.get()); // 30
```

## Múltiplas Dependências

`Values` pode depender de múltiplos estados:

```typescript
import { State, Values } from '@jay-js/system';

const firstName = State('John');
const lastName = State('Doe');
const target = {};

const setValue = Values(() => `${firstName.value} ${lastName.value}`);
setValue(target, 'fullName');

console.log(target); // { fullName: 'John Doe' }

firstName.set('Jane');
console.log(target); // { fullName: 'Jane Doe' }

lastName.set('Smith');
console.log(target); // { fullName: 'Jane Smith' }
```

## Valores Calculados Complexos

Você pode realizar cálculos complexos em suas funções de valor:

```typescript
import { State, Values } from '@jay-js/system';

const items = State([1, 2, 3, 4, 5]);
const target = {};

const setValue = Values(() => {
  const values = items.value;
  return {
    sum: values.reduce((a, b) => a + b, 0),
    avg: values.reduce((a, b) => a + b, 0) / values.length,
    count: values.length
  };
});

setValue(target, 'stats');

console.log(target.stats);
// { sum: 15, avg: 3, count: 5 }

items.set([10, 20, 30]);
console.log(target.stats);
// { sum: 60, avg: 20, count: 3 }
```

## Exemplos de Uso

### Atualizando a Interface do Usuário

Um uso comum do `Values` é manter elementos do DOM atualizados com o estado:

```typescript
import { State, Values } from '@jay-js/system';

const isDark = State(false);
const userName = State('Visitante');
const unreadCount = State(5);

// Elementos do DOM
const body = document.body;
const greeting = document.getElementById('greeting');
const badge = document.getElementById('notification-badge');

// Define classes CSS baseadas no tema
const setThemeClass = Values(() => 
  isDark.value ? 'dark-theme' : 'light-theme'
);
setThemeClass(body, 'className');

// Define texto de saudação
const setGreeting = Values(() => 
  `Olá, ${userName.value}!`
);
setGreeting(greeting, 'textContent');

// Define texto e visibilidade do badge
const setBadgeText = Values(() => 
  unreadCount.value > 0 ? unreadCount.value.toString() : ''
);
setBadgeText(badge, 'textContent');

const setBadgeVisibility = Values(() => 
  unreadCount.value > 0 ? 'visible' : 'hidden'
);
setBadgeVisibility(badge.style, 'visibility');

// Agora quando qualquer estado mudar, a UI é atualizada automaticamente
isDark.set(true);     // Muda o tema do corpo
userName.set('João'); // Atualiza a saudação
unreadCount.set(0);   // Esconde o badge
```

### Sincronizando Dados

Você pode usar `Values` para manter diferentes partes de seu aplicativo sincronizadas:

```typescript
import { State, Values } from '@jay-js/system';

// Estado original
const user = State({
  id: 1,
  name: 'John',
  email: 'john@example.com'
});

// Estados derivados para diferentes partes da aplicação
const profileSection = {};
const headerSection = {};
const adminPanel = {};

// Sincroniza o perfil completo
const syncProfile = Values(() => user.value);
syncProfile(profileSection, 'userData');

// Sincroniza apenas o nome para o cabeçalho
const syncHeader = Values(() => ({
  displayName: user.value.name,
  initials: user.value.name.charAt(0)
}));
syncHeader(headerSection, 'user');

// Sincroniza dados para o painel admin
const syncAdmin = Values(() => ({
  id: user.value.id,
  name: user.value.name,
  email: user.value.email,
  role: 'user'
}));
syncAdmin(adminPanel, 'selectedUser');

// Quando o usuário muda, todas as seções são atualizadas
user.set({
  id: 2,
  name: 'Jane',
  email: 'jane@example.com'
});
```

## Considerações de Desempenho

- Como `Values` cria um efeito reativo, ele deve ser usado para atualizações que realmente precisam ser reativas
- Para objetos grandes ou cálculos pesados, considere usar otimizações como memoização
- Em loops, evite criar novos `Values` para cada item; em vez disso, reutilize a mesma função `Values` com diferentes alvos