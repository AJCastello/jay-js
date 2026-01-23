# @jay-js/system

> Core framework for Jay JS with JSX runtime, state management, routing, forms, i18n and more.

[![npm version](https://img.shields.io/npm/v/@jay-js/system.svg)](https://www.npmjs.com/package/@jay-js/system)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/@jay-js/system.svg)](https://www.npmjs.com/package/@jay-js/system)

## Installation

```bash
npm install @jay-js/system
```

## Overview

`@jay-js/system` is the core of Jay JS framework, providing everything you need for modern web applications:

| Module | Description |
|--------|-------------|
| [JSX Runtime](#jsx-runtime) | Native JSX/TSX support with automatic runtime |
| [State](#state) | Reactive state management with subscriptions |
| [Router](#router) | Client-side routing with path parameters |
| [Forms](#forms) | Form handling with Yup/Zod validation |
| [i18n](#i18n) | Internationalization with dynamic locale switching |
| [Query](#query) | Data fetching with caching and automatic revalidation |
| [Mutation](#mutation) | Write operations with optimistic updates |
| [Each](#each) | Reactive list rendering |
| [Guard](#guard) | Route protection and navigation guards |
| [Theme](#theme) | Theme management (dark/light modes) |
| [Lazy](#lazy) | Dynamic module loading |
| [Utils](#utils) | DOM utilities and helpers |

## Modules

### JSX Runtime

Native JSX/TSX support with the `Base` factory and `Fragment` support. The JSX runtime was previously a separate package (`@jay-js/jsx`) and is now integrated into `@jay-js/system`.

**TypeScript Configuration** (`tsconfig.json`):

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@jay-js/system"
  }
}
```

**Vite Configuration** (`vite.config.ts`):

```typescript
import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxImportSource: "@jay-js/system"
  }
});
```

**Creating Components**:

```tsx
// Simple component
const Greeting = () => <h1>Hello Jay JS</h1>;

// Component with props
const Button = ({ label, onclick }) => (
  <button onclick={onclick}>{label}</button>
);

// Using Fragment for multiple elements
import { Fragment } from "@jay-js/system";

const List = () => (
  <Fragment>
    <li>Item 1</li>
    <li>Item 2</li>
  </Fragment>
);

// Or use shorthand <>...</>
const List2 = () => (
  <>
    <li>Item 1</li>
    <li>Item 2</li>
  </>
);
```

**Lifecycle Hooks** (`onmount`/`onunmount`):

```tsx
const Timer = () => {
  let interval: number;

  return (
    <div
      onmount={(el) => {
        interval = setInterval(() => console.log("tick"), 1000);
        // Return cleanup function (optional)
        return () => clearInterval(interval);
      }}
      onunmount={() => {
        clearInterval(interval);
      }}
    >
      Timer running...
    </div>
  );
};
```

**Reactive Props** (auto-updates when state changes):

```tsx
import { state } from "@jay-js/system";

const count = state(0);

const Counter = () => (
  <div>
    <span className={() => count.value > 5 ? "high" : "low"}>
      Count: {() => count.value}
    </span>
    <button onclick={() => count.set(c => c + 1)}>+</button>
  </div>
);
```

See [Core README](./src/core/README.md) for complete documentation.

---

### State

Reactive state management with automatic dependency tracking and subscriptions.

```typescript
import { state, effect, derived } from "@jay-js/system";

// Create reactive state
const counter = state(0);
const user = state({ name: "John", age: 30 });

// Access with .value (auto-tracks dependencies)
console.log(counter.value); // 0
console.log(user.value.name); // "John"

// Update state
counter.set(5);
counter.set(c => c + 1);
user.value.age = 31; // Direct property mutation (tracked)
```

Reactive effects and derived values:

```typescript
// Effects re-run when accessed states change
effect(() => {
  console.log(`Count: ${counter.value}`);
});

// Derived states auto-update
const doubled = derived(() => counter.value * 2);
console.log(doubled.value); // 12

// Manual subscriptions
counter.sub("logger", (value) => console.log("Counter:", value));
counter.unsub("logger");
```

See [State README](./src/state/README.md) for complete documentation.

---

### Router

Client-side routing with path parameters, query strings, and nested routes.

```typescript
import { createRouter, navigate, getParams } from "@jay-js/system";

createRouter([
  { path: "/", element: () => <Home /> },
  { path: "/user/:id", element: () => <UserProfile /> }
], {
  target: "#app"
});

// Programmatic navigation
navigate("/user/123");

// Access route parameters
const { id } = getParams(); // id = "123"
```

With layouts and nested routes:

```typescript
import { createRouter, Outlet } from "@jay-js/system";

createRouter([
  {
    path: "/admin",
    element: () => <AdminLayout><Outlet /></AdminLayout>,
    layout: true,
    children: [
      { path: "/dashboard", element: () => <Dashboard /> },
      { path: "/users", element: () => <UsersList /> }
    ]
  }
], { target: "#app" });
```

See [Router README](./src/router/README.md) for complete documentation.

---

### Forms

Form handling with Yup or Zod validation support.

```typescript
import { handleForm, zodResolver } from "@jay-js/system";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const form = handleForm({
  defaultValues: { email: "", password: "" },
  resolver: zodResolver(schema)
});

// Register fields and handle submission
Object.assign(document.querySelector("#email"), form.register("email"));
document.querySelector("form").onsubmit = form.onSubmit((data) => console.log(data));
```

See [Forms README](./src/forms/README.md) for complete documentation.

---

### i18n

Internationalization with dynamic locale switching.

```typescript
import { i18nDefineOptions, initLanguage, getI18n, setLanguage } from "@jay-js/system";

i18nDefineOptions({
  languages: [
    { code: "en", data: { greeting: "Hello" } },
    { code: "pt", data: { greeting: "Ola" } }
  ],
  defaultLocale: "en"
});

initLanguage();

const t = getI18n<{ greeting: string }>();
t("greeting"); // "Hello"
setLanguage("pt");
t("greeting"); // "Ola"
```

See [i18n README](./src/i18n/README.md) for complete documentation.

---

### Query

Reactive data fetching with caching, automatic revalidation, and retry support.

```typescript
import { query } from "@jay-js/system";

const usersQuery = query("users", async (signal) => {
  const res = await fetch("/api/users", { signal });
  return res.json();
});

// Access reactive states
if (usersQuery.isLoading) console.log("Loading...");
if (usersQuery.data) console.log(usersQuery.data);

// Control methods
usersQuery.refetch();
usersQuery.invalidate();
```

With options:

```typescript
const todosQuery = query("todos", fetchTodos, {
  staleTime: 5000,
  cacheTime: 300000,
  refetchOnFocus: true,
  retry: 3
});
```

### Mutation

Reactive mutations for write operations (POST/PUT/DELETE) with optimistic updates.

```typescript
import { mutation } from "@jay-js/system";

const createUser = mutation(async (user, signal) => {
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
    signal
  });
  return res.json();
});

// Execute mutation
await createUser.mutate({ name: "John", email: "john@example.com" });

// Access states
if (createUser.isLoading) console.log("Saving...");
if (createUser.isSuccess) console.log("Saved!", createUser.data);
```

With cache invalidation:

```typescript
const updateUser = mutation(fetcher, {
  invalidateQueries: ["users", "user-list"],
  onSuccess: (data) => console.log("Updated:", data)
});
```

See [Query README](./src/query/README.md) for complete documentation.

---

### Each

Reactive list rendering with efficient keyed updates.

```typescript
import { each, state } from "@jay-js/system";

const items = state([
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" }
]);

// each(getter, keySelector, renderFn)
const listFragment = each(
  () => items.value,
  "id",
  (item) => <div>{item.name}</div>
);

document.body.appendChild(listFragment);

// Updates automatically when items change
items.set(current => [...current, { id: 3, name: "Item 3" }]);
```

---

### Guard

Permission-based access control system.

```typescript
import { definePermissions, hasPermission } from "@jay-js/system";

// Define permissions for a role
const userPermissions = definePermissions("user", "articles")
  .allow(["read", "comment"])
  .forbid(["edit", "delete"])
  .save();

// Check permissions
const result = hasPermission(userPermissions, "user", "articles", "read");
if (result.granted) {
  // Allow the action
}
```

---

### Theme

Theme management with dark/light mode support and multiple theme definitions.

```typescript
import { themeDefineOptions, initTheme, setTheme, toggleThemeMode, getCurrentTheme } from "@jay-js/system";

// Configure theme options
themeDefineOptions({
  target: document.documentElement,
  saveToLocalStorage: true,
  defaultTheme: "light",
  defaultDarkTheme: "dark",
  useAsDataset: true
});

// Initialize theme (respects system preference and localStorage)
initTheme();

// Get current theme state
const { theme, mode } = getCurrentTheme();

// Set specific theme
setTheme("dark");

// Toggle between light/dark modes
toggleThemeMode();
```

With custom theme definitions:

```typescript
themeDefineOptions({
  themes: [
    { id: "default", light: "light", dark: "dark" },
    { id: "forest", light: "forest-light", dark: "forest-dark" },
    { id: "ocean", light: "ocean-light", dark: "ocean-dark" }
  ],
  defaultTheme: "light",
  defaultDarkTheme: "dark"
});

// Set theme by ID (uses current mode)
setTheme("forest");

// Set theme with specific mode
setTheme("ocean", "dark");
```

See [Theme README](./src/theme/README.md) for complete documentation.

---

### Lazy

Dynamic module loading with automatic caching and garbage collection.

```typescript
import { Lazy } from "@jay-js/system";

// Lazy load a component
const MyComponent = Lazy({
  module: "MyComponent",
  import: () => import("./MyComponent")
});

// With custom loader
const Dashboard = Lazy({
  module: "Dashboard",
  import: () => import("./Dashboard"),
  collect: false // Prevent garbage collection
}, <div>Loading...</div>);
```

See [Lazy README](./src/lazy/README.md) for complete documentation.

---

### Utils

DOM utilities for rendering and element references.

```typescript
import { render, createRef } from "@jay-js/system";

// Render content into a target element
render("#app", <MyComponent />);

// Append content
render("#list", <NewItem />, { insert: "append" });

// Prepend content
render("#notifications", <Alert />, { insert: "prepend" });

// Replace target element entirely
render("#old-element", <NewElement />, { replace: true });

// Handle async content
await render("#app", asyncLoadComponent());
```

**Element References**:

```typescript
import { createRef } from "@jay-js/system";

const inputRef = createRef<HTMLInputElement>();

const Form = () => (
  <div>
    <input ref={inputRef} type="text" />
    <button onclick={() => inputRef.current?.focus()}>
      Focus Input
    </button>
  </div>
);
```

See [Utils README](./src/utils/README.md) for complete documentation.

---

### Naming Conventions

Jay JS uses `handle*` prefix instead of `use*` to avoid confusion with React hooks:

| Old Name | New Name |
|----------|----------|
| `useForm` | `handleForm` |

```typescript
// Correct usage
import { handleForm } from "@jay-js/system";

const form = handleForm({
  defaultValues: { email: "", password: "" },
  resolver: zodResolver(schema)
});
```

---

## Subpath Imports

Each module can be imported individually for tree-shaking:

```typescript
import { state, effect, derived } from "@jay-js/system/state";
import { createRouter, navigate } from "@jay-js/system/router";
import { handleForm, zodResolver } from "@jay-js/system/forms";
import { getI18n, setLanguage } from "@jay-js/system/i18n";
import { query, mutation } from "@jay-js/system/query";
import { themeDefineOptions, initTheme } from "@jay-js/system/theme";
import { render, createRef } from "@jay-js/system/utils";
```

## Migration

If you are migrating from `@jay-js/jsx` or `@jay-js/elements`, these packages are now deprecated. All functionality has been consolidated into `@jay-js/system`.

### From @jay-js/jsx

1. Update `tsconfig.json`:
```diff
- "jsxImportSource": "@jay-js/jsx"
+ "jsxImportSource": "@jay-js/system"
```

2. Update imports:
```diff
- import { Fragment } from "@jay-js/jsx";
+ import { Fragment } from "@jay-js/system";
```

### From @jay-js/elements

The elements package functionality is now part of the core system. Update imports:
```diff
- import { Base } from "@jay-js/elements";
+ import { Base } from "@jay-js/system";
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions included.

## License

MIT
