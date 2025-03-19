# @jay-js/system State

## Table of Contents
- [Installation](#installation)
- [Basic Features](#basic-features)
  - [Simple State](#simple-state)
  - [Main Methods](#main-methods)
  - [Updating the State](#updating-the-state)
  - [Getting the State](#getting-the-state)
  - [Subscribing to Updates](#subscribing-to-updates)
  - [Unsubscribing](#unsubscribing)
  - [Manually Triggering Updates](#manually-triggering-updates)
  - [Clearing Subscriptions](#clearing-subscriptions)
  - [Accessing with Automatic Dependency Detection](#accessing-with-automatic-dependency-detection)
- [Advanced Utilities](#advanced-utilities)
  - [Persistent State (`PersistentState`)](#persistent-state-persistentstate)
  - [Combined States (`CombineStates`)](#combined-states-combinestates)
  - [Derived State (`DerivedState`)](#derived-state-derivedstate)
  - [Derived State with Automatic Dependencies (`Derived`)](#derived-state-with-automatic-dependencies-derived)
  - [Reactive Effects (`Effect`)](#reactive-effects-effect)
  - [Reactive Values (`Values`)](#reactive-values-values)
- [Usage Examples](#usage-examples)
  - [Managing a Counter](#managing-a-counter)
  - [Managing Theme with Persistent State](#managing-theme-with-persistent-state)
- [Conclusion](#conclusion)

The state management system of the `@jay-js/system` library offers a simple and powerful solution for managing reactive data in TypeScript or JavaScript applications. With its reactive design, it enables efficient data management and updates in your application.

## Installation

To install the `@jay-js/system` library, use one of the following package managers:

```sh
npm install @jay-js/system
```

or

```sh
yarn add @jay-js/system
```

## Basic Features

### Simple State

The main component is `State`, which can be used to create a reactive state:

```typescript
import { State } from '@jay-js/system';

interface Person {
  name: string;
  age: number;
}

const person = State<Person>({
  name: 'John',
  age: 30,
});
```

### Main Methods

The created state object has the following methods:

- `set`: Updates the state value
- `get`: Gets the current state value
- `sub`: Subscribes to state updates
- `unsub`: Unsubscribes from state updates
- `trigger`: Manually triggers an update
- `clear`: Clears all subscriptions and optionally sets a new value
- `value`: Accessor property to get or set the state value (with automatic dependency detection)

### Updating the State

You can update a state by directly providing a new value:

```typescript
person.set({ name: 'Jane', age: 25 }); // Defines a new value directly
```

Or by using a function that receives the current state and returns the new state:

```typescript
// Updating based on the current state (immutable)
person.set((currentState) => ({ ...currentState, age: currentState.age + 1 }));

// Or modifying directly (mutable)
person.set((currentState) => {
  currentState.age = currentState.age + 1;
  return currentState;
});
```

The update can include additional options:

```typescript
person.set({ name: 'Jane', age: 25 }, {
  silent: true, // Does not notify subscribers
  target: 'specificSubscriber', // Notifies only a specific subscriber
  force: true // Forces the update even if the value is the same
});
```

### Getting the State

```typescript
const currentState = person.get(); // Gets the current state value

// Or with a callback
person.get((value) => {
  console.log('Current value:', value);
});
```

### Subscribing to Updates

```typescript
// Subscribes to updates with a specific ID
person.sub('mySubscription', (data) => {
  console.log('Updated state:', data);
});

// Executes the callback immediately and subscribes to future updates
person.sub('mySubscription', (data) => {
  console.log('Updated state:', data);
}, true);
```

### Unsubscribing

```typescript
person.unsub('mySubscription');
```

### Manually Triggering Updates

```typescript
// Notifies all subscribers
person.trigger();

// Notifies only a specific subscriber
person.trigger('mySubscription');
```

### Clearing Subscriptions

```typescript
// Only clears the subscriptions
person.clear();

// Clears the subscriptions and sets a new value
person.clear({ name: 'Bob', age: 40 });
```

### Accessing with Automatic Dependency Detection

The `value` property allows access to the state with automatic dependency detection:

```typescript
function printPersonName() {
  console.log(person.value.name);  // Automatically subscribes to changes in this state
}
```

## Advanced Utilities

### Persistent State (`PersistentState`)

Creates a state that persists its values in localStorage:

```typescript
import { PersistentState } from '@jay-js/system';

const preferences = PersistentState('user-preferences', {
  theme: 'light',
  language: 'en'
});

preferences.set({ theme: 'dark', language: 'pt' });
// The value is automatically saved in localStorage
```

### Combined States (`CombineStates`)

Combines multiple states into a single object:

```typescript
import { State, CombineStates } from '@jay-js/system';

const firstName = State('John');
const lastName = State('Doe');
const age = State(30);

const person = CombineStates({
  firstName,
  lastName,
  age
});

// person.value contains { firstName: 'John', lastName: 'Doe', age: 30 }
// When any of the source states change, the combined state will be updated
firstName.set('Jane');
// Now person.value contains { firstName: 'Jane', lastName: 'Doe', age: 30 }
```

### Derived State (`DerivedState`)

Creates a state that depends on another state:

```typescript
import { State, DerivedState } from '@jay-js/system';

const count = State(10);
const doubled = DerivedState(count, value => value * 2);

console.log(doubled.value); // 20
count.set(15);
console.log(doubled.value); // 30
```

### Derived State with Automatic Dependencies (`Derived`)

Creates a derived state that automatically recalculates when any state accessed within the function changes:

```typescript
import { State, Derived } from '@jay-js/system';

const count = State(10);
const factor = State(2);
const result = Derived(() => count.value * factor.value);

console.log(result.value); // 20
count.set(15);
console.log(result.value); // 30
factor.set(3);
console.log(result.value); // 45
```

### Reactive Effects (`Effect`)

Executes a function and automatically monitors which states are accessed, re-executing the function when those states change:

```typescript
import { State, Effect } from '@jay-js/system';

const count = State(0);
const message = State('');

Effect(() => {
  message.set(`The counter is at ${count.value}`);
});

console.log(message.value); // "The counter is at 0"
count.set(5);
console.log(message.value); // "The counter is at 5"
```

### Reactive Values (`Values`)

Creates a helper to set values in objects reactively:

```typescript
import { State, Values } from '@jay-js/system';

const count = State(0);
const doubleCount = State(0);

// Configures a reactive relationship between the states
const setValue = Values(() => count.value * 2);

// Applies the reactive value to the state doubleCount
setValue(doubleCount, 'value');

console.log(doubleCount.value); // 0
count.set(5);
console.log(doubleCount.value); // 10
```

## Usage Examples

### Managing a Counter

```typescript
import { State, Effect } from '@jay-js/system';

const counter = State(0);

// Automatic reactivity
Effect(() => {
  console.log(`Current count: ${counter.value}`);
});

// Increment counter
function increment() {
  counter.set(state => state++)
}

// Decrement counter
function decrement() {
  counter.set(state => state--)
}

// In a UI component, you could do:
// button.onclick = increment;
```

### Managing Theme with Persistent State

```typescript
import { PersistentState, Effect } from '@jay-js/system';

const theme = PersistentState('app-theme', {
  mode: 'light',
  primaryColor: '#0077cc',
  fontSize: 16
});

// Apply the theme whenever it changes
Effect(() => {
  document.body.classList.toggle('dark-mode', theme.value.mode === 'dark');
  document.documentElement.style.setProperty('--primary-color', theme.value.primaryColor);
  document.documentElement.style.setProperty('--font-size', `${theme.value.fontSize}px`);
});

// Toggle light/dark mode
function toggleDarkMode() {
  theme.set(current => ({
    ...current,
    mode: current.mode === 'light' ? 'dark' : 'light'
  }));
}
```

## Conclusion

The state management system of the `@jay-js/system` library offers a powerful and flexible approach to handling reactive data in your applications. With its simple but efficient design, it allows you to create reactive applications while keeping complexity under control.

Main features:

1.  **Zero dependencies** - lightweight and independent solution
2.  **Full typing** - full TypeScript support
3.  **Simple API** - easy to learn and use
4.  **Automatic reactivity** - with the dependency detection system
5.  **Flexibility** - works with both immutable and mutable approaches
6.  **Powerful utilities** - such as persistent, derived, and reactive effects states

Try the state management system of `@jay-js/system` in your projects and simplify the way you handle reactive data!