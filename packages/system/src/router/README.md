# @jay-js/system - Router

The Router component of the `@jay-js/system` library is a lightweight and flexible client-side routing solution for your web applications. It allows you to handle navigation and manage application state with ease.

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

Define your routes using the `Route` type:

```javascript
import { Router, Navigate } from "@jay-js/system";

type Route = {
  path: string;
  element: () => HTMLElement | (() => Promise<HTMLElement>) | undefined;
  target: HTMLElement;
};
```

Set up your routes:

```javascript
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
```

Initialize the router with your routes:

```javascript
Router(routes);
```

Navigate to a specific route:

```javascript
document.getElementById("about-link").addEventListener("click", () => {
  Navigate("/about");
});
```

## Features

### Dynamic Route Parameters

The Router component supports dynamic route parameters, allowing you to capture variables in the URL path:

```javascript
const routes = [
  {
    path: "/user/:userId",
    element: () => document.createElement("div"),
    target: document.getElementById("app"),
  },
];
```

You can then access these parameters using the `getParams()` function:

```javascript
import { getParams } from "@jay-js/system";

const params = getParams();
console.log(params.userId); // logs the user ID from the URL path
```

### Query Parameters

The `getParams()` function also provides access to query parameters in the URL:

```javascript
// URL: /user/123?name=John

const params = getParams();
console.log(params.name); // logs "John"
```

## Additional Information

The Router component of the `@jay-js/system` library provides a simple, yet powerful solution for client-side routing in your web applications. By using the Router component, you can keep your application's navigation clean and maintainable, making it easy to scale your project as it grows.