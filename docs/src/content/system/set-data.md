---
category: State
categoryId: 3
articleId: 19
slug: set-data
title: Set Data
description: Learn how to set data using the State management system in Jay JS.
---

# Set Data

The `set` method in the `State` object allows you to update the current state. It accepts either a new value directly or a function that receives the current state and returns the new state. Optionally, you can pass a configuration object to control the behavior of the update.

## Syntax

```typescript
state.set(newData: T | ((currentState: T) => T), options?: setOptions): void
```

* `newData`: The new data you want to set. It can either be:
    - A direct value of the same type as your initial state (`T`).
    - A function that receives the current state and returns the new state. This is useful for making changes based on the existing data.
* `options` (optional): An object with additional settings:
    - `silent`: If `true`, the state update will not trigger effects.
    - `target`:  If provided, only the specified effect(s) will be triggered. Can be a string (single effect ID) or an array of strings (multiple effect IDs).

## Basic Usage

To set a new value directly:

```typescript
const myState = State({ count: 0 }); // Initial state: 0

myState.set({ count: 1 });           // Update state to 1
```

In this example, the state is initialized with `{ count: 0 }`. The `set` method is then called with a new object `{ count: 1 }`, updating the state.

## Using a Function

If you need to compute the new state based on the current one, you can pass a function to the `set` method:

```typescript
const userState = State({ name: "Alice", age: 30 });

userState.set((currentState) => ({ ...currentState, age: 31 }));  // Update only the "age" property
```

Here, the `set` method receives a function that takes the current state, increments the `count` property, and returns the updated state.

## Silent Updates

By default, setting the state triggers all subscribed effects. However, you can perform a silent update that doesn't trigger effects by passing `{ silent: true }` in the options:

```typescript
const myState = State({ count: 0 });

myState.set({ count: 1 }, { silent: true });
```

In this case, the state is updated to `{ count: 1 }`, but no effects are triggered due to the `silent` option.

## Targeting Specific Effects

If you want to trigger only specific effects after setting the state, you can specify them using the `target` option:

```typescript
const myState = State({ count: 0 });

// Assuming there are effects subscribed with IDs "increment" and "decrement"
myState.set({ count: 1 }, { target: ["increment", "decrement"] });
```

In this example, only the effects with IDs `increment` and `decrement` will be triggered when the state is updated. See the [sub](/system/subscriptions) method for more information on subscribing to effects.

Or for a single effect:

```typescript
myState.set({ count: 1 }, { target: "increment" });
```

This allows fine-grained control over which effects are executed upon state changes.

## Conclusion

The `set` method provides a flexible way to update the state in your application, with options for silent updates and targeting specific effects. This makes it easier to manage complex state logic and side effects in your applications built with Jay JS.

* When setting new data using a function, make sure the function is **pure**, meaning it doesn't have side effects and always returns the same output for the same input. 
* Use `target` judiciously to optimize performance and avoid unnecessary updates.
* Avoid deeply nested state structures to keep your state management simple and efficient.