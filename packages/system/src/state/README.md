# @jay-js/system - State Management

A reactive state management system with automatic dependency tracking, subscriptions, and computed values.

## Table of Contents

- [Installation](#installation)
- [Basic Features](#basic-features)
  - [Creating State](#creating-state)
  - [State Methods](#state-methods)
  - [Accessing State](#accessing-state)
  - [Updating State](#updating-state)
  - [Subscribing to Updates](#subscribing-to-updates)
  - [Unsubscribing](#unsubscribing)
  - [Manually Triggering Updates](#manually-triggering-updates)
  - [Clearing Subscriptions](#clearing-subscriptions)
- [Reactive Utilities](#reactive-utilities)
  - [effect](#effect)
  - [derived](#derived)
  - [values](#values)
- [Advanced Features](#advanced-features)
  - [Granular Reactivity](#granular-reactivity)
  - [Set Options](#set-options)
- [Usage Examples](#usage-examples)
  - [Counter Example](#counter-example)
  - [User Profile Example](#user-profile-example)
  - [Shopping Cart Example](#shopping-cart-example)
- [API Reference](#api-reference)
- [Migration from Previous Version](#migration-from-previous-version)

## Installation

```bash
npm install @jay-js/system
```

## Basic Features

### Creating State

The `state` function creates a reactive state container:

```typescript
import { state } from "@jay-js/system";

// Primitive value
const counter = state(0);

// Object
const user = state({
  name: "John",
  age: 30
});

// Array
const todos = state([
  { id: 1, text: "Learn Jay JS", done: false },
  { id: 2, text: "Build something", done: false }
]);

// With TypeScript
interface Person {
  name: string;
  age: number;
}

const person = state<Person>({
  name: "John",
  age: 30
});
```

### State Methods

Every state object has the following methods:

| Method | Description |
|--------|-------------|
| `set(value)` | Updates the state value |
| `get()` | Gets the current state value |
| `sub(id, effect, run?)` | Subscribes to state changes |
| `unsub(id)` | Unsubscribes from state changes |
| `trigger(...ids)` | Manually triggers subscribers |
| `clear(newValue?)` | Clears all subscriptions and optionally sets a new value |
| `value` | Property accessor with automatic dependency tracking |

### Accessing State

There are two ways to access state:

**1. Using `.get()` method:**

```typescript
const counter = state(0);

// Get current value
const currentValue = counter.get();

// With callback
counter.get((value) => {
  console.log("Current value:", value);
});
```

**2. Using `.value` property (with automatic dependency tracking):**

```typescript
const counter = state(0);

// Automatically tracks this state as a dependency
// when accessed inside an effect or derived
console.log(counter.value);
```

### Updating State

**Direct value:**

```typescript
counter.set(5);
user.set({ name: "Jane", age: 25 });
```

**Functional update:**

```typescript
// Based on current state
counter.set(c => c + 1);
user.set(u => ({ ...u, age: u.age + 1 }));
```

**Direct property mutation (tracked):**

```typescript
// Objects and arrays support direct property mutation
// Changes are automatically tracked and trigger updates
user.value.name = "Jane";
user.value.age = 25;

todos.value.push({ id: 3, text: "New todo", done: false });
todos.value[0].done = true;
```

### Subscribing to Updates

```typescript
const counter = state(0);

// Subscribe with unique ID
counter.sub("logger", (value) => {
  console.log("Counter changed:", value);
});

// Subscribe and run immediately
counter.sub("display", (value) => {
  document.getElementById("counter").textContent = value;
}, true);
```

### Unsubscribing

```typescript
counter.unsub("logger");
```

### Manually Triggering Updates

```typescript
// Trigger all subscribers
counter.trigger();

// Trigger specific subscriber
counter.trigger("logger");

// Trigger multiple subscribers
counter.trigger("logger", "display", "analytics");
```

### Clearing Subscriptions

```typescript
// Clear all subscriptions
counter.clear();

// Clear subscriptions and set new value
counter.clear(0);

// Clear subscriptions with functional update
counter.clear(c => c * 2);
```

## Reactive Utilities

### effect

Executes a function and automatically tracks which states are accessed. Re-runs the function when any tracked state changes.

```typescript
import { state, effect } from "@jay-js/system";

const count = state(0);
const message = state("");

// This effect will re-run whenever count.value changes
effect(() => {
  message.set(`The counter is at ${count.value}`);
});

console.log(message.value); // "The counter is at 0"
count.set(5);
console.log(message.value); // "The counter is at 5"
```

**Use cases:**

```typescript
// DOM updates
const theme = state("light");

effect(() => {
  document.body.classList.toggle("dark", theme.value === "dark");
});

// Logging
effect(() => {
  console.log("User changed:", user.value);
});

// Side effects
effect(() => {
  localStorage.setItem("user", JSON.stringify(user.value));
});
```

### derived

Creates a derived state that automatically recalculates when any accessed state changes.

```typescript
import { state, derived } from "@jay-js/system";

const count = state(10);
const factor = state(2);

// Automatically updates when count or factor changes
const result = derived(() => count.value * factor.value);

console.log(result.value); // 20
count.set(15);
console.log(result.value); // 30
factor.set(3);
console.log(result.value); // 45
```

**Examples:**

```typescript
// Filtered list
const todos = state([
  { text: "Task 1", done: false },
  { text: "Task 2", done: true },
  { text: "Task 3", done: false }
]);

const pendingTodos = derived(() =>
  todos.value.filter(t => !t.done)
);

// Full name from parts
const firstName = state("John");
const lastName = state("Doe");

const fullName = derived(() =>
  `${firstName.value} ${lastName.value}`
);

// Computed price
const price = state(100);
const discount = state(0.1);

const finalPrice = derived(() =>
  price.value * (1 - discount.value)
);
```

### values

Creates a helper for setting values in objects reactively.

```typescript
import { state, values } from "@jay-js/system";

const count = state(0);
const display = { text: "" };

// Creates a reactive setter
const setValue = values(() => `Count: ${count.value}`);

// Apply to object property
setValue(display, "text");

console.log(display.text); // "Count: 0"
count.set(5);
console.log(display.text); // "Count: 5"
```

**DOM example:**

```typescript
const user = state({ name: "John" });

const element = document.getElementById("greeting");

// Automatically updates element.textContent when user changes
const setValue = values(() => `Hello, ${user.value.name}!`, element);
setValue(element, "textContent");
```

## Advanced Features

### Granular Reactivity

The state system supports granular reactivity for objects and arrays. When you access a specific property inside an effect, only changes to that property will trigger the effect:

```typescript
const user = state({
  name: "John",
  age: 30,
  email: "john@example.com"
});

// This effect only tracks user.value.name
effect(() => {
  console.log("Name changed:", user.value.name);
});

// This will NOT trigger the effect above
user.value.age = 31;

// This WILL trigger the effect
user.value.name = "Jane";
```

### Set Options

The `set` method accepts an options object:

```typescript
interface TSetOptions {
  // When true, subscribers will not be notified
  silent?: boolean;

  // Specific subscriber(s) to notify
  target?: string | string[];
}
```

**Examples:**

```typescript
// Silent update (no notifications)
counter.set(10, { silent: true });

// Notify only specific subscriber
counter.set(10, { target: "display" });

// Notify multiple specific subscribers
counter.set(10, { target: ["display", "analytics"] });
```

## Usage Examples

### Counter Example

```typescript
import { state, effect } from "@jay-js/system";

const counter = state(0);

// Automatic reactivity
effect(() => {
  console.log(`Current count: ${counter.value}`);
});

function increment() {
  counter.set(c => c + 1);
}

function decrement() {
  counter.set(c => c - 1);
}

function reset() {
  counter.set(0);
}
```

### User Profile Example

```typescript
import { state, derived, effect } from "@jay-js/system";

const user = state({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com"
});

// Derived full name
const fullName = derived(() =>
  `${user.value.firstName} ${user.value.lastName}`
);

// Effect for saving to localStorage
effect(() => {
  localStorage.setItem("user", JSON.stringify(user.value));
});

// Update functions
function updateEmail(email: string) {
  user.value.email = email;
}

function updateName(first: string, last: string) {
  user.set(u => ({
    ...u,
    firstName: first,
    lastName: last
  }));
}
```

### Shopping Cart Example

```typescript
import { state, derived, effect } from "@jay-js/system";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const cart = state<CartItem[]>([]);

// Derived values
const itemCount = derived(() =>
  cart.value.reduce((sum, item) => sum + item.quantity, 0)
);

const total = derived(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// Cart actions
function addItem(item: Omit<CartItem, "quantity">) {
  const existing = cart.value.find(i => i.id === item.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.value.push({ ...item, quantity: 1 });
  }
}

function removeItem(id: number) {
  cart.set(items => items.filter(i => i.id !== id));
}

function updateQuantity(id: number, quantity: number) {
  const item = cart.value.find(i => i.id === id);
  if (item) {
    item.quantity = quantity;
  }
}

function clearCart() {
  cart.clear([]);
}
```

### JSX Integration

```tsx
import { state, effect, derived } from "@jay-js/system";

const count = state(0);
const doubled = derived(() => count.value * 2);

const Counter = () => {
  const container = (
    <div class="counter">
      <span id="value"></span>
      <span id="doubled"></span>
      <button onclick={() => count.set(c => c + 1)}>+</button>
      <button onclick={() => count.set(c => c - 1)}>-</button>
    </div>
  );

  effect(() => {
    container.querySelector("#value").textContent = `Count: ${count.value}`;
    container.querySelector("#doubled").textContent = `Doubled: ${doubled.value}`;
  });

  return container;
};
```

## API Reference

### state<T>(initialValue: T): TState<T>

Creates a reactive state container.

**Type Definition:**

```typescript
type TState<T> = {
  set: (newData: T | ((currentState: T) => T), options?: TSetOptions) => void;
  get: (callback?: (value: T) => void) => T;
  sub: (id: string, effect: (value: T) => void, run?: boolean) => void;
  unsub: (id: string) => void;
  trigger: (...ids: string[]) => void;
  clear: (newData?: T | ((currentState: T) => T)) => void;
  value: T;
};

type TSetOptions = {
  silent?: boolean;
  target?: string | string[];
};
```

### effect(fn: () => void): void

Executes a function and tracks state dependencies for automatic re-execution.

### derived<T>(fn: () => T): TState<T>

Creates a derived state that recalculates when dependencies change.

### values(fn: () => any, element?: HTMLElement): (object: any, ...path: string[]) => void

Creates a reactive value setter for object properties.

## Migration from Previous Version

If you're upgrading from a previous version, here are the key changes:

### Function Names

| Old API | New API |
|---------|---------|
| `State(value)` | `state(value)` |
| `Effect(fn)` | `effect(fn)` |
| `Derived(fn)` | `derived(fn)` |
| `Values(fn)` | `values(fn)` |

### Example Migration

**Before:**

```typescript
import { State, Effect, Derived } from "@jay-js/system";

const count = State(0);
const doubled = Derived(() => count.value * 2);

Effect(() => {
  console.log(count.value);
});
```

**After:**

```typescript
import { state, effect, derived } from "@jay-js/system";

const count = state(0);
const doubled = derived(() => count.value * 2);

effect(() => {
  console.log(count.value);
});
```

### New Features

- **Granular reactivity**: Object/array property access is now tracked individually
- **Direct mutation support**: `user.value.name = "Jane"` works with automatic tracking
- **Subscription registry**: Automatic cleanup when DOM elements are removed
