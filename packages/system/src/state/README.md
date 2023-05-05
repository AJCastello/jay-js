# @jay-js/system State

The `State` component in the `@jay-js/system` library provides a simple yet powerful state management solution for your TypeScript or JavaScript projects. With its reactive design, it enables efficient management of data and updates in your application.

## Installation

To install the `@jay-js/system` library, use one of the following package managers:

```sh
npm install @jay-js/system
```

or

```sh
yarn add @jay-js/system
```

## Usage

First, import the `State` component from the `@jay-js/system` library:

```typescript
import { State } from '@jay-js/system';
```

Next, create a state object with an initial value:

```typescript
interface Person {
  name: string;
  age: number;
}

const person = State<Person>({
  name: 'John',
  age: 30,
});
```

You can then interact with the state using the provided methods:

- `set`: Update the state value
- `get`: Retrieve the current state value
- `sub`: Subscribe to state updates
- `unsub`: Unsubscribe from state updates
- `trigger`: Manually trigger an update

### Updating State

```typescript
person.set({ name: 'Jane', age: 25 }); // Set the new state value directly

person.set((currentState) => ({ ...currentState, age: currentState.age + 1 })); // Update the state value based on the current state
// or
person.set((currentState) => {
  currentState.age =  currentState.age + 1;
  return currentState;
});

```

### Retrieving State

```typescript
const currentState = person.get(); // Get the current state value
```

### Subscribing to Updates

```typescript
person.sub('mySubscription', (data) => {
  console.log('Updated state:', data);
});
```

### Unsubscribing from Updates

```typescript
person.unsub('mySubscription');
```

### Manually Triggering an Update

```typescript
person.trigger();
```

## Examples

Here's an example demonstrating how to use the `State` component to manage a counter:

```typescript
import { State } from '@jay-js/system';

interface Counter {
  count: number;
}

const counter = State<Counter>({
  count: 0,
});

counter.sub('log', (data) => {
  console.log('Current count:', data.count);
});

counter.set((currentState) => ({ count: currentState.count + 1 })); // Increment the counter
// or
counter.set((currentState) => {
  currentState.count = currentState.count + 1;
  return currentState;
});
```

In this example, the `State` component manages the counter state, automatically notifying subscribed functions of changes.

## Conclusion

The `State` component in the `@jay-js/system` library provides a powerful, lightweight state management solution for your TypeScript or JavaScript projects. Its reactive design ensures efficient updates and easy integration with your application. Give it a try and simplify your state management tasks!