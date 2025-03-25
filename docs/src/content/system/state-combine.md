---
category: State Management
categoryId: 2
articleId: 4
slug: state-combine
title: Estados Combinados
description: Aprenda a usar CombineStates para combinar múltiplos estados em um único objeto reativo.
---

# Estados Combinados

A função `CombineStates` permite combinar múltiplos estados individuais em um único estado composto. Isso é útil quando você precisa agrupar dados relacionados ou quando quer trabalhar com uma "única fonte de verdade" que compõe vários estados.

## Criando Estados Combinados

Para combinar estados, use a função `CombineStates` com um objeto contendo os estados a serem combinados:

```typescript
import { State, CombineStates } from '@jay-js/system';

// Estados individuais
const firstName = State('John');
const lastName = State('Doe');
const age = State(30);

// Estado combinado
const person = CombineStates({
  firstName,
  lastName,
  age
});

console.log(person.get());
// Resultado: { firstName: 'John', lastName: 'Doe', age: 30 }
```

## Como Funciona

Quando você cria um estado combinado:

1. Ele obtém os valores iniciais de cada estado de origem
2. Cria um novo estado com um objeto contendo esses valores
3. Se inscreve em cada estado de origem para atualizar o estado combinado sempre que qualquer um deles mudar
4. Atualiza apenas a propriedade correspondente quando um estado específico muda

## Acessando Valores

Você pode acessar o valor combinado como um objeto completo:

```typescript
// Obtém o objeto completo
const personData = person.get();
console.log(personData); // { firstName: 'John', lastName: 'Doe', age: 30 }

// Ou via propriedade value
console.log(person.value); // { firstName: 'John', lastName: 'Doe', age: 30 }

// Acessando propriedades específicas
console.log(person.value.firstName); // 'John'
console.log(person.value.age); // 30
```

## Reagindo a Mudanças

Quando qualquer estado de origem muda, o estado combinado é automaticamente atualizado:

```typescript
// Assinando mudanças no estado combinado
person.sub('profile-update', (data) => {
  console.log('Perfil atualizado:', data);
});

// Atualizando estados individuais
firstName.set('Jane');
// Logs: "Perfil atualizado: { firstName: 'Jane', lastName: 'Doe', age: 30 }"

age.set(31);
// Logs: "Perfil atualizado: { firstName: 'Jane', lastName: 'Doe', age: 31 }"
```

## Atualizando o Estado Combinado

Você também pode atualizar o estado combinado diretamente:

```typescript
// Atualizando todo o objeto
person.set({
  firstName: 'Bob',
  lastName: 'Smith',
  age: 40
});

// Atualizando parcialmente com função
person.set((current) => ({
  ...current,
  age: current.age + 1
}));
```

**Nota importante:** Atualizar o estado combinado diretamente **não atualiza** os estados de origem. As mudanças só afetam o objeto combinado.

## Exemplo de Caso de Uso: Formulário de Perfil

Um caso de uso comum para `CombineStates` é gerenciar estados de formulários:

```typescript
import { State, CombineStates, Effect } from '@jay-js/system';

// Estados individuais para cada campo
const username = State('');
const email = State('');
const password = State('');
const agreedToTerms = State(false);

// Validações de campos individuais
const isUsernameValid = State(false);
const isEmailValid = State(false);
const isPasswordValid = State(false);

// Combine os estados de formulário
const formData = CombineStates({
  username,
  email,
  password,
  agreedToTerms
});

// Combine os estados de validação
const validationState = CombineStates({
  isUsernameValid,
  isEmailValid,
  isPasswordValid,
  agreedToTerms
});

// Cálculo do estado de validação geral do formulário
Effect(() => {
  const isFormValid = 
    validationState.value.isUsernameValid &&
    validationState.value.isEmailValid &&
    validationState.value.isPasswordValid &&
    validationState.value.agreedToTerms;
  
  // Atualiza o botão de envio
  document.getElementById('submit-btn').disabled = !isFormValid;
});

// Validar campo de email quando atualizado
email.sub('validate-email', (value) => {
  const valid = /^\S+@\S+\.\S+$/.test(value);
  isEmailValid.set(valid);
});

// Função de envio do formulário
function submitForm() {
  const data = formData.get();
  console.log('Enviando dados:', data);
  // Lógica para enviar ao servidor...
}
```

## Uso com Estados Aninhados

`CombineStates` também funciona bem com estados que contêm objetos ou arrays:

```typescript
const user = State({ name: 'John', permissions: ['read', 'write'] });
const settings = State({ darkMode: true, fontSize: 16 });
const notifications = State([
  { id: 1, text: 'Nova mensagem' },
  { id: 2, text: 'Novo comentário' }
]);

const appState = CombineStates({
  user,
  settings,
  notifications
});

// Atualização de um estado aninhado
user.set((current) => ({
  ...current,
  permissions: [...current.permissions, 'admin']
}));

// O appState é atualizado automaticamente com as novas permissões
console.log(appState.value.user.permissions);
// ['read', 'write', 'admin']
```