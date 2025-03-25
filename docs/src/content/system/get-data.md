---
category: State
categoryId: 3
articleId: 20
slug: get-data
title: Get Data
description: How to retrieve the current state.
---

# Get Data

Retrieving the current state in the `State` management system of Jay JS is straightforward and efficient. The `get` method allows you to access the current state value directly or execute a callback function whenever the state is accessed.

## Syntax

```typescript
state.get(callback?: (data: T) => void): T
```

* `callback` (optional): A function that will be called with the current state data whenever the state is updated using the `set` method.

## Accessing Current State

To simply retrieve the current state value:

```typescript
const countState = State(0);

const currentCount = countState.get(); // currentCount is 0
```

In this example, the `get` method is called without any arguments, returning the current state value.

## Using Callback

If you need to perform actions every time the state is accessed, you can pass a callback function to the `get` method:

```typescript
const myState = State({ name: "Bob" });

myState.get((data) => {
  console.log("Current state:", data); // Output: Current state: { name: "Bob" }
});
```

The callback function will be executed immediately with the current state as its argument, allowing you to react to state accesses dynamically.

## Conclusion

The `get` method in the `State` management system provides a convenient way to access the current state, with the added flexibility of executing callbacks on access. This feature enhances the observability of state changes and allows for more interactive and responsive application behaviors.