---
category: State
categoryId: 3
articleId: 22
slug: manage-effects
title: Manage Effects
description: Strategies for managing and organizing effects.
---

# Manage Effects

Managing effects in the `State` management system of Jay JS involves adding, removing, and triggering functions that react to state changes. These effects are crucial for creating reactive applications that respond to state updates automatically. `State` provides several tools and strategies to help you effectively manage your effects as your application grows.

## Adding Effects

Effects are added using the `sub` method, which subscribes a callback function to state changes. Each effect is identified by a unique string identifier:

```typescript
const myState = State({ count: 0 });

myState.sub("effect1", (data) => {
  console.log("Effect 1 triggered with state:", data);
});

myState.sub("effect2", (data) => {
  console.log("Effect 2 triggered with state:", data);
});
```

In this example, two effects are subscribed to state changes. Whenever the state updates, both effects will be triggered, logging the new state to the console.

## Unsubscribing Effects

As covered in the "Subscribe Effects" article, you can unsubscribe individual effects using their unique ID and the `unsub` method:

```typescript
countState.sub("effect1", (count) => {
  console.log("Count changed to:", count);
});

// ... later ...
countState.unsub("effect1"); // The "effect1" effect is removed
```

After calling `unsub` with `"effect1"`, the corresponding effect will no longer be triggered by state changes. This is essential for preventing memory leaks and ensuring that unused effects are not unnecessarily executed.

## Triggering All Effects

Sometimes, you might want to manually trigger all subscribed effects without changing the state. The `trigger` method allows you to do just that:

```typescript
myState.trigger();
```

Calling `trigger` will execute all currently subscribed effects with the current state.

## Remove all effects

Resetting or clearing the state is a common requirement in many applications, especially when you need to revert to initial conditions or completely wipe the state for security reasons. The `clear` method in the `State` management system of Jay JS provides a straightforward way to achieve this.

Check the [Clear Instance Enhanced](/system/clear-instance-enhanced) article for more details.

```typescript
const myState = State({ count: 0 });

// Reset state to a new value and remove all effects
myState.clear({ count: 10 });

// Or clear the state entirely and remove all effects
myState.clear();

// Reset state using a function and remove all effects
myState.clear(currentState => {
  // Perform custom state reset logic
  console.log("State is about to be cleared along with all effects");
  return { count: 0 }
});
```

After calling `clear`, the state is reset or cleared, and all previously subscribed effects are removed, preventing them from being triggered by future state changes.




## Simple Examples

### Conditional Effects

You can create effects that are only triggered under specific conditions. This can be achieved by checking the state data within the effect function:

```typescript
const countState = State(5);

countState.sub("logEvenCount", (count) => {
  if (count % 2 === 0) {
    console.log("Count is even:", count);
  }
});

countState.set(1); // No log
countState.set(2); // Logs "Count is even: 2"
countState.set(3); // No log
countState.set(4); // Logs "Count is even: 4"
```

### Derived State

Sometimes, you might need to calculate or derive new state values based on existing state data. Instead of creating a separate effect, consider using a derived state function:

```typescript
const countState = State(0);
const doubleCountState = () => countState.get() * 2;

countState.sub("logDoubleCount", () => {
  console.log("Double count:", doubleCountState());
});

console.log(doubleCountState()); // 0
countState.set(5); // Logs "Double count: 10"
console.log(doubleCountState()); // 10
```

## Conclusion

Effect management in the `State` system of Jay JS provides a robust mechanism for reacting to state changes. By subscribing, unsubscribing, and manually triggering effects, you can create highly responsive applications that adapt to state changes seamlessly. This approach to state management simplifies the development of dynamic and interactive web applications.