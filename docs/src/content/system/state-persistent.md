---
category: State
categoryId: 2
articleId: 3
slug: state-persistent
title: Estado Persistente
description: Aprenda a usar PersistentState para persistir dados no localStorage automaticamente.
---

# Estado Persistente

O `PersistentState` é uma extensão do estado básico que salva automaticamente os valores no `localStorage` do navegador. Isso permite que seus estados mantenham seus valores entre recarregamentos de página ou sessões de navegação.

## Criando um Estado Persistente

Para criar um estado persistente, use a função `PersistentState` com uma chave de armazenamento e um valor padrão:

```typescript
import { PersistentState } from '@jay-js/system';

// Estado simples com valor primitivo
const theme = PersistentState('app-theme', 'light');

// Estado com objeto
const userPreferences = PersistentState('user-prefs', {
  theme: 'light',
  fontSize: 16,
  notifications: true
});
```

## Como Funciona

Quando você cria um `PersistentState`:

1. Ele tenta carregar o valor do `localStorage` usando a chave fornecida
2. Se encontrado e válido, usa esse valor como estado inicial
3. Se não encontrado ou inválido, usa o valor padrão fornecido
4. Cada vez que o estado é atualizado, o novo valor é automaticamente salvo no `localStorage`

## Uso Completo

`PersistentState` herda todos os métodos e propriedades de um estado normal, então você pode usá-lo exatamente como usaria um `State` regular:

```typescript
// Acessando o valor
const currentTheme = theme.get();
console.log(currentTheme); // 'light' ou valor recuperado do localStorage

// Atualizando o valor (automaticamente salvo no localStorage)
theme.set('dark');

// Acessando via propriedade value
console.log(theme.value); // 'dark'

// Assinando mudanças
theme.sub('theme-listener', (newTheme) => {
  document.body.className = newTheme;
});

// Usando com função de atualização
userPreferences.set((current) => ({
  ...current,
  fontSize: current.fontSize + 1
}));
```

## Tratamento de Erros

O `PersistentState` lida graciosamente com erros:

- Se ocorrer um erro ao ler do `localStorage` (ex: JSON inválido), ele usa o valor padrão
- Se ocorrer um erro ao salvar no `localStorage` (ex: cota excedida), o erro é capturado e registrado no console, sem interromper a aplicação

```typescript
// Mesmo se localStorage não estiver disponível, funcionará com o valor padrão
const fallbackState = PersistentState('sensitive-data', 'default');
```

## Exemplo de Caso de Uso: Gerenciando Tema

Um caso de uso comum para `PersistentState` é gerenciar as preferências de tema do usuário:

```typescript
import { PersistentState, Effect } from '@jay-js/system';

// Cria um estado persistente para o tema
const theme = PersistentState('app-theme', {
  mode: 'light',
  primaryColor: '#0077cc',
  accentColor: '#ff6b6b'
});

// Aplica o tema sempre que mudar
Effect(() => {
  const currentTheme = theme.value;
  
  // Aplica o modo claro/escuro
  document.body.classList.toggle('dark-mode', currentTheme.mode === 'dark');
  
  // Aplica as cores ao CSS
  document.documentElement.style.setProperty('--primary-color', currentTheme.primaryColor);
  document.documentElement.style.setProperty('--accent-color', currentTheme.accentColor);
  
  console.log(`Tema aplicado: ${currentTheme.mode}`);
});

// Função para alternar entre modo claro e escuro
function toggleDarkMode() {
  theme.set(current => ({
    ...current,
    mode: current.mode === 'light' ? 'dark' : 'light'
  }));
}

// Botão na interface
document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);
```

## Limitações

Lembre-se das limitações do `localStorage`:

- Armazena apenas strings, embora o `PersistentState` cuide da serialização/deserialização JSON para você
- Capacidade limitada (geralmente 5-10MB dependendo do navegador)
- Não é seguro para dados sensíveis (use outras soluções para dados sensíveis)
- Disponível apenas em navegadores (não funcionará em ambientes sem `localStorage`, como alguns ambientes SSR)