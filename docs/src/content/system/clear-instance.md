---
category: State
categoryId: 3
articleId: 23
slug: clear-instance-enhanced
title: Clear Instance Enhanced
description: A detailed guide on resetting or clearing the entire state instance, including all effects, using the State management system in Jay JS.
---

# Clear Instance Enhanced

Resetting or clearing the entire state instance, including all subscribed effects, is a fundamental operation in many applications. This process is essential for reverting to initial conditions, completely wiping the state for security purposes, or preparing the state for a different context within the application. The `clear` method in the `State` management system of Jay JS offers a comprehensive approach to handle these requirements effectively.

## Resetting State

The `clear` method provides flexibility in how you reset the state. You can reset the state to a new value, clear the state entirely, or apply custom logic during the reset process. Here's how you can utilize these capabilities:

### Reset to a New Value

To reset the state to a new value and simultaneously remove all subscribed effects:

```typescript
const myState = State({ count: 0 });

// Reset state to a new value and remove all effects
myState.clear({ count: 10 });
```

### Clear the State Entirely

To clear the state entirely, leaving it undefined, and remove all subscribed effects:

```typescript
myState.clear();
```

### Custom Reset Logic

For more complex scenarios, you can use a function to define custom reset logic:

```typescript
myState.clear(currentState => {
  // Perform custom state reset logic
  console.log("State is about to be cleared along with all effects");
  return { count: 0 };
});
```

## Optional New Value

The `clear` method accepts an optional parameter that specifies the new state value. If a function is passed, it acts as a state updater function, receiving the current state and returning the new state. This allows for dynamic state resetting based on the current state:

```typescript
const myState = State({ count: 0 });

// Reset state using a function and remove all effects
myState.clear(currentState => {
  // Dynamic reset logic based on the current state
  return {...currentState, count: 0 };
});
```

## Clearing Effects

An integral part of the `clear` method is its ability to remove all subscribed effects. This ensures that no stale effects are left behind after the state has been reset or cleared, preventing potential issues such as memory leaks or unintended behavior:

```typescript
myState.clear(); // Clears the state and all effects
```

After invoking `clear`, the state is reset or cleared according to the provided parameters, and all previously subscribed effects are removed. This action safeguards against outdated effects being triggered by future state changes, maintaining the predictability and efficiency of your state management strategy.

## Conclusion

The `clear` method in the `State` management system of Jay JS stands out as a versatile tool for resetting or clearing the entire state instance, including all effects. By offering detailed control over the reset process and ensuring the removal of all subscribed effects, this method supports a wide range of application scenarios, from simple state resets to comprehensive state management strategies.