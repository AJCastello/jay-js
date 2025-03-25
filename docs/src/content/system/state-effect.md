---
category: State
categoryId: 2
articleId: 6
slug: state-effect
title: Efeitos Reativos
description: Aprenda a usar Effect para criar efeitos colaterais que respondem automaticamente a mudanças nos estados.
---

# Efeitos Reativos

A função `Effect` permite criar efeitos colaterais reativos que são executados automaticamente quando estados observados mudam. Isso é perfeito para sincronizar o estado com sistemas externos, como o DOM, APIs ou outros componentes.

## Criando Efeitos Reativos

Para criar um efeito reativo, use a função `Effect` com uma função que será executada sempre que as dependências mudarem:

```typescript
import { State, Effect } from '@jay-js/system';

// Estado a ser observado
const count = State(0);

// Efeito que reage a mudanças no count
Effect(() => {
  console.log(`O contador mudou para: ${count.value}`);
  document.title = `Contador: ${count.value}`;
});

// O efeito é executado imediatamente (logs "O contador mudou para: 0")

// Quando o estado muda, o efeito é executado novamente
count.set(1);  // logs "O contador mudou para: 1"
count.set(2);  // logs "O contador mudou para: 2"
```

## Como Funciona

Quando você cria um efeito:

1. A função é executada imediatamente ao ser definida
2. Durante a execução, o sistema rastreia quais estados são acessados via `.value`
3. O efeito é registrado como assinante de todos os estados acessados
4. Quando qualquer um desses estados muda, a função é executada novamente

## Rastreamento de Dependências Automático

O `Effect` rastreia automaticamente quais estados são acessados dentro da função, criando dependências dinâmicas:

```typescript
import { State, Effect } from '@jay-js/system';

const count = State(0);
const name = State('John');
const showName = State(false);

// Dependências condicionais - a função só depende de name quando showName é true
Effect(() => {
  console.log(`Contador: ${count.value}`);
  
  if (showName.value) {
    console.log(`Nome: ${name.value}`);
  }
});

count.set(1);      // Trigger: logs apenas "Contador: 1"
showName.set(true); // Trigger: logs "Contador: 1" e "Nome: John"
name.set('Jane');   // Trigger: logs "Contador: 1" e "Nome: Jane"
```

## Casos de Uso Comuns

### Sincronizando com o DOM

```typescript
import { State, Effect } from '@jay-js/system';

const theme = State('light');
const userName = State('Visitante');

// Atualiza atributos do DOM quando o tema muda
Effect(() => {
  const isDark = theme.value === 'dark';
  document.body.classList.toggle('dark-theme', isDark);
  document.body.classList.toggle('light-theme', !isDark);
  
  // Também poderia atualizar variáveis CSS
  document.documentElement.style.setProperty(
    '--bg-color', 
    isDark ? '#121212' : '#ffffff'
  );
});

// Atualiza elementos específicos quando o nome muda
Effect(() => {
  document.getElementById('user-greeting').textContent = 
    `Olá, ${userName.value}!`;
});
```

### Sincronizando com APIs Externas

```typescript
import { State, Effect } from '@jay-js/system';

const userId = State(null);
const userData = State(null);
const isLoading = State(false);

// Carrega dados do usuário quando o ID muda
Effect(() => {
  const currentId = userId.value;
  
  if (!currentId) {
    userData.set(null);
    return;
  }
  
  // Inicia o carregamento
  isLoading.set(true);
  
  fetch(`/api/users/${currentId}`)
    .then(response => response.json())
    .then(data => {
      userData.set(data);
      isLoading.set(false);
    })
    .catch(error => {
      console.error('Erro ao carregar usuário:', error);
      isLoading.set(false);
    });
});

// Mais tarde, quando o ID muda, o efeito carrega o novo usuário
userId.set(123);
```

### Salvando Dados Localmente

```typescript
import { State, Effect } from '@jay-js/system';

const settings = State({
  theme: 'light',
  fontSize: 16,
  notifications: true
});

// Salva configurações no localStorage quando mudam
Effect(() => {
  const currentSettings = settings.value;
  localStorage.setItem('app-settings', JSON.stringify(currentSettings));
  console.log('Configurações salvas:', currentSettings);
});

// Quando as configurações mudam, elas são salvas automaticamente
settings.set(current => ({
  ...current,
  theme: 'dark'
}));
```

## Evitando Loops Infinitos

Cuidado ao modificar estados dentro de um efeito que observa esses mesmos estados, pois isso pode causar loops infinitos:

```typescript
// ❌ Potencial loop infinito
const count = State(0);

Effect(() => {
  console.log(`Contador: ${count.value}`);
  count.set(count.value + 1); // CUIDADO: Isso causa um loop infinito!
});
```

Para evitar loops, certifique-se de que seus efeitos têm condições terminais claras:

```typescript
// ✅ Efeito com condição terminal
const count = State(0);
const isRunning = State(true);

Effect(() => {
  if (!isRunning.value) return;
  
  console.log(`Contador: ${count.value}`);
  
  // Incrementa até um limite
  if (count.value < 10) {
    count.set(count.value + 1);
  } else {
    isRunning.set(false);
  }
});
```

## Padrões de Uso Avançados

### Efeitos de Limpeza

Em algumas situações, você pode precisar limpar recursos ou cancelar operações quando os estados mudam:

```typescript
import { State, Effect } from '@jay-js/system';

const userId = State(null);
const searchQuery = State('');

// Exemplo de efeito com "limpeza manual"
Effect(() => {
  const query = searchQuery.value.trim();
  
  if (!query) return;
  
  console.log(`Iniciando busca para: "${query}"`);
  
  // Usando um timeout para simular uma API com debounce
  const timeoutId = setTimeout(() => {
    console.log(`Resultados da busca para: "${query}"`);
  }, 500);
  
  // Se searchQuery mudar novamente antes do timeout, o anterior
  // será cancelado pela próxima execução deste efeito
  userId.sub('cleanup', () => {
    console.log(`Cancelando busca para: "${query}"`);
    clearTimeout(timeoutId);
  });
});
```

### Agrupando Lógica Relacionada

Os efeitos permitem agrupar lógica relacionada:

```typescript
import { State, Effect } from '@jay-js/system';

// Estados relacionados a um carrinho de compras
const cartItems = State([]);
const cartCount = State(0);
const cartTotal = State(0);

// Um único efeito gerencia todas as derivações do carrinho
Effect(() => {
  const items = cartItems.value;
  
  // Atualiza contagem de itens
  cartCount.set(items.length);
  
  // Atualiza total
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.set(total);
  
  // Salva no localStorage
  localStorage.setItem('cart', JSON.stringify(items));
  
  // Atualiza badge no ícone do carrinho
  document.getElementById('cart-badge').textContent = items.length.toString();
  document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
});

// Adicionar um item atualiza tudo automaticamente
function addToCart(product, quantity = 1) {
  cartItems.set(current => [
    ...current,
    { ...product, quantity }
  ]);
}
```