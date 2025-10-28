# @jay-js/system

`@jay-js/system` is a versatile and lightweight JavaScript library designed to help streamline your front-end development with useful utilities and components. It includes functionality for lazy-loading modules, managing application state, client-side routing, forms management, internationalization, and theming.

## Installation

You can install the `@jay-js/system` package using either npm or yarn:

**Using npm:**

```bash
npm install @jay-js/system
```

**Using yarn:**

```bash
yarn add @jay-js/system
```

## Usage

### LazyModule (Lazy Loading)

Lazy-load your modules to improve the performance of your application:

```javascript
import { LazyModule } from "@jay-js/system";

const loaderElement = document.createElement("div");
loaderElement.innerHTML = "Loading...";

function MyLazyComponent(){
  return LazyModule({
    module: "MyComponent",
    import: () => import("./components/MyComponent"),
  }, loaderElement);
};

document.body.appendChild(MyLazyComponent());
```

### State

Manage your application state efficiently:

```javascript
import { State } from "@jay-js/system";

interface Person {
  name: string;
  age: number;
}

const person = State<Person>({
  name: "John",
  age: 30,
});

person.sub("mySubscription", (data) => {
  console.log("data changed", data);
});

person.set((data) => {
  data.name = "Jane";
  return data;
});

```

### Router

Implement client-side routing with ease:

```javascript
import { Router, Navigate } from "@jay-js/system";

const routes = [
  {
    path: "/",
    element: () => document.createElement("div"),
    target: document.getElementById("app"),
  },
  {
    path: "/about",
    element: () => document.createElement("div"),
    target: document.getElementById("app"),
  },
];

Router(routes);

document.getElementById("about-link").addEventListener("click", () => {
  Navigate("/about");
});
```

## Additional Information

The `@jay-js/system` library is designed to be flexible and efficient. Its components and utilities can be easily integrated into your projects to improve your development experience. As your project grows, you can rely on the `@jay-js/system` library to keep your codebase maintainable and performant.