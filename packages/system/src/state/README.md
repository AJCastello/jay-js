# Jay JS - State

Jay JS is a simple and lightweight library for managing state in JavaScript and TypeScript applications.

## State Controller

The state controller allows you to manage your application's state easily and efficiently. It provides a way to store and update states, as well as notify components or functions about state changes.

### How to use

1. Import the `State` function from the Jay JS package:

   ```javascript
   import { State } from "jay-js";
   ```

2. Create a new state using the `State` function:

   ```javascript
   const counter = State(0);
   ```

3. Use the `set` and `get` methods to update and retrieve the state:

   ```javascript
   counter.set(1);
   console.log(counter.get()); // 1
   ```

4. Subscribe to state changes using the `sub` method:

   ```javascript
   counter.sub("counterListener", (newValue) => {
     console.log("Counter changed:", newValue);
   });
   ```

5. Unsubscribe from state changes using the `unsub` method:

   ```javascript
   counter.unsub("counterListener");
   ```

6. Manually trigger all subscribed effects using the `trigger` method:

   ```javascript
   counter.trigger();
   ```

### API

- `set(newData: T)`: Sets the new value of the state. If `newData` is a function, the current state will be passed to the function and the result will be the new state.

- `get(callback?: (data: T) => void)`: Returns the current value of the state. If a callback is provided, it will be called with the current state value.

- `sub(id: string, effect: (newValue: T) => void)`: Subscribes to state changes. The `effect` function will be called whenever the state is updated. The function receives the new state value as an argument.

- `unsub(id: string)`: Unsubscribes from a previously registered effect using the `sub` method.

- `trigger()`: Manually triggers all subscribed effects, calling them with the current state value.

### Example

```javascript
import { State } from "jay-js/state";

const counter = State(0);

counter.sub("counterListener", (newValue) => {
  console.log("Counter changed:", newValue);
});

counter.set(1); // Logs "Counter changed: 1"
```

## Contributing

We welcome your contributions! Please feel free to open an issue or pull request on the project repository.
