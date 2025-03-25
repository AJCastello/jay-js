---
category: State
categoryId: 3
articleId: 21
slug: subscribe-effects
title: Subscribe Effects
description: How to subscribe to state changes and trigger effects using the Jay JS State package.
---

# Subscribe to State Changes

Subscribing to state changes is a core feature of the `State` management system in Jay JS, allowing components to react to state updates automatically. The `sub` method enables you to register a callback function (effect) that gets executed whenever the state changes.

## Syntax

```typescript
state.sub(id: string, effect: (data: T) => any, run = false): any
```

* `id`: A unique string identifier for the effect. This is used to manage and unsubscribe the effect later.
* `effect`: The function to be executed when the state changes. It receives the current state data as an argument.
* `run` (optional): If `true`, the effect will be executed immediately upon subscription, in addition to being triggered on subsequent state changes.

Returns: The effect function itself.

## Basic Subscription

To subscribe to state changes, you provide an identifier (`id`) for the subscription and the callback function (`effect`). Optionally, you can decide whether the effect should run immediately upon subscription:

```typescript
const myState = State({ count: 0 });

myState.sub("counterListener", (data) => {
  console.log("State changed:", data);
});

myState.set({ count: 5 }); // Logs "State changed: { count: 5 }"
```

In this example, `"counterListener"` is the identifier for the subscription, and the callback logs the new state whenever it changes. 

## Running Immediately

```typescript
const myState = State({ count: 0 });

myState.sub("counterListener", (data) => {
  console.log("Count value:", data.count);
}, true); // Logs "Count value: 0" immediately

myState.set({ count: 1 }); // Logs "Count value: 1
```

The third parameter `true` indicates that the effect should also run immediately with the current state.

## Unsubscribing

To stop listening to state changes, you can unsubscribe using the `unsub` method and providing the identifier of the subscription:

```typescript
myState.sub("counterListener", (count) => {
  console.log("Count changed to:", count);
});

myState.unsub("counterListener");
```

After calling `unsub` with the identifier `'counterListener'`, the corresponding effect will no longer be triggered by state changes.

## Example: Dynamically Updating a UI Element

```typescript
const messageState = State("Hello");

const messageElement = document.getElementById("message");

messageState.sub("updateMessage", (message) => {
  messageElement.textContent = message;
});

// ... later, when the message changes ...
messageState.set("World!"); // The messageElement will update to "World!"
```

## Conclusion

The `sub` method in the `State` management system of Jay JS provides a powerful way to create reactive applications by easily subscribing to state changes. This mechanism ensures that your application components remain up-to-date with the latest state, enhancing the user experience and simplifying state management across your application.

### Key Points

* Effects are functions that react to state changes.
* Each effect should have a unique ID so you can manage it later.
* You can unsubscribe effects using the `unsub` method and the effect's ID.
* The `run` option allows you to execute effects immediately upon subscription, which is useful for initial setup or rendering.