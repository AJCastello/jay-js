# Core Module - Base Factory & JSX Runtime

The Core module provides the foundation for Jay JS framework, including the `Base` element factory, `Fragment` support, and integrated JSX runtime.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [JSX Configuration](#jsx-configuration)
   - [TypeScript](#typescript-configuration)
   - [Vite](#vite-configuration)
4. [API Reference](#api-reference)
   - [Base](#base)
   - [Fragment](#fragment)
5. [Creating Components](#creating-components)
6. [Lifecycle Hooks](#lifecycle-hooks)
7. [Reactive Props](#reactive-props)
8. [Refs](#refs)
9. [Event Handling](#event-handling)
10. [Migration from @jay-js/jsx](#migration-from-jay-jsjsx)

## Overview

The Core module consolidates functionality that was previously split across multiple packages:

- **JSX Runtime**: Previously `@jay-js/jsx`, now integrated into `@jay-js/system`
- **Base Factory**: Creates HTML elements with reactive props, lifecycle hooks, and event handling
- **Fragment**: Allows grouping elements without adding extra DOM nodes

## Installation

```bash
npm install @jay-js/system
```

## JSX Configuration

### TypeScript Configuration

Configure `tsconfig.json` to use Jay JS as the JSX transform source:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@jay-js/system",
    "moduleResolution": "bundler",
    "target": "ES2020",
    "module": "ESNext"
  }
}
```

### Vite Configuration

Configure `vite.config.ts` for JSX support:

```typescript
import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxImportSource: "@jay-js/system"
  }
});
```

## API Reference

### Base

The `Base` function is the core element factory that creates HTML elements with extended capabilities.

```typescript
function Base<T extends TBaseTagMap = "div">(props: TBase<T>): HTMLElementTagNameMap[T]
```

| Property | Type | Description |
|----------|------|-------------|
| `tag` | `keyof HTMLElementTagNameMap` | HTML tag name (default: "div") |
| `id` | `string \| (() => string)` | Element ID (can be reactive) |
| `className` | `string \| (() => string)` | CSS classes (can be reactive) |
| `style` | `TStyle \| (() => TStyle)` | Inline styles (can be reactive) |
| `dataset` | `object` | Data attributes |
| `children` | `TChildren` | Child elements, text, or reactive functions |
| `ref` | `TRefObject<HTMLElement>` | Reference to the DOM element |
| `listeners` | `Listener` | Event listeners object |
| `onmount` | `(el: HTMLElement) => void \| (() => void)` | Called when element is mounted |
| `onunmount` | `(el: HTMLElement) => void` | Called when element is unmounted |

**Direct Usage** (without JSX):

```typescript
import { Base } from "@jay-js/system";

const element = Base({
  tag: "button",
  className: "btn btn-primary",
  onclick: () => console.log("clicked"),
  children: "Click me"
});

document.body.appendChild(element);
```

**With JSX**:

```tsx
const Button = ({ label }) => (
  <button className="btn btn-primary" onclick={() => console.log("clicked")}>
    {label}
  </button>
);
```

### Fragment

Creates a DocumentFragment to group multiple elements without adding an extra wrapper.

```typescript
function Fragment({ children }: IFragment): DocumentFragment
```

| Property | Type | Description |
|----------|------|-------------|
| `children` | `Node \| Node[]` | Child elements to group |

**Usage**:

```tsx
import { Fragment } from "@jay-js/system";

// Using Fragment component
const List = () => (
  <Fragment>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </Fragment>
);

// Using shorthand syntax
const List2 = () => (
  <>
    <li>Item 1</li>
    <li>Item 2</li>
  </>
);
```

## Creating Components

Components in Jay JS are simple functions that return HTML elements.

### Functional Components

```tsx
// Simple component
const Greeting = () => <h1>Hello World</h1>;

// Component with props
interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  onclick?: () => void;
}

const Button = ({ label, variant = "primary", onclick }: ButtonProps) => (
  <button className={`btn btn-${variant}`} onclick={onclick}>
    {label}
  </button>
);

// Usage
const App = () => (
  <div>
    <Greeting />
    <Button label="Submit" onclick={() => console.log("submitted")} />
  </div>
);
```

### Components with Children

```tsx
interface CardProps {
  title: string;
  children: any;
}

const Card = ({ title, children }: CardProps) => (
  <div className="card">
    <h2 className="card-title">{title}</h2>
    <div className="card-body">{children}</div>
  </div>
);

// Usage
const App = () => (
  <Card title="Welcome">
    <p>This is the card content.</p>
    <Button label="Learn more" />
  </Card>
);
```

## Lifecycle Hooks

Jay JS provides `onmount` and `onunmount` lifecycle hooks for managing side effects.

### onmount

Called when the element is connected to the DOM. Can return a cleanup function.

```tsx
const Timer = () => {
  return (
    <div
      onmount={(element) => {
        console.log("Timer mounted:", element);

        const interval = setInterval(() => {
          console.log("tick");
        }, 1000);

        // Return cleanup function (runs on unmount)
        return () => {
          clearInterval(interval);
          console.log("Timer cleanup");
        };
      }}
    >
      Timer is running
    </div>
  );
};
```

### onunmount

Called when the element is disconnected from the DOM.

```tsx
const WebSocketComponent = () => {
  let socket: WebSocket;

  return (
    <div
      onmount={() => {
        socket = new WebSocket("wss://example.com");
        socket.onmessage = (e) => console.log("Message:", e.data);
      }}
      onunmount={() => {
        socket?.close();
        console.log("WebSocket closed");
      }}
    >
      Connected to WebSocket
    </div>
  );
};
```

### Async Lifecycle

Lifecycle hooks support async/await:

```tsx
const DataLoader = () => (
  <div
    onmount={async (element) => {
      const data = await fetchData();
      element.textContent = data.message;
    }}
  >
    Loading...
  </div>
);
```

## Reactive Props

Any prop can be made reactive by passing a function. The prop will automatically update when accessed state changes.

```tsx
import { state } from "@jay-js/system";

const theme = state<"light" | "dark">("light");
const count = state(0);

const Counter = () => (
  <div className={() => `counter theme-${theme.value}`}>
    {/* Reactive text content */}
    <span>{() => `Count: ${count.value}`}</span>

    {/* Reactive className */}
    <span className={() => count.value > 10 ? "high" : "low"}>
      Status
    </span>

    {/* Reactive style */}
    <div style={() => ({ backgroundColor: count.value > 5 ? "red" : "green" })}>
      Indicator
    </div>

    {/* Reactive individual style property */}
    <div style={{ opacity: () => count.value / 10 }}>
      Fading element
    </div>

    <button onclick={() => count.set(c => c + 1)}>Increment</button>
  </div>
);
```

### Reactive Children

Children can also be reactive:

```tsx
const items = state(["Apple", "Banana", "Cherry"]);

const List = () => (
  <ul>
    {() => items.value.map(item => <li>{item}</li>)}
  </ul>
);

// Adding an item will automatically update the DOM
items.set(current => [...current, "Date"]);
```

## Refs

Use `useRef` to get a reference to a DOM element:

```tsx
import { useRef } from "@jay-js/system";

const InputFocus = () => {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onclick={() => inputRef.current?.focus()}>
        Focus Input
      </button>
    </div>
  );
};
```

## Event Handling

Event handlers are passed as `on[event]` props (lowercase event name):

```tsx
const InteractiveElement = () => (
  <div
    onclick={(e) => console.log("Clicked:", e.target)}
    onmouseover={(e) => console.log("Mouse over")}
    onkeydown={(e) => console.log("Key:", e.key)}
  >
    Interact with me
  </div>
);

// Form events
const Form = () => (
  <form
    onsubmit={(e) => {
      e.preventDefault();
      console.log("Form submitted");
    }}
  >
    <input
      type="text"
      oninput={(e) => console.log("Input:", e.target.value)}
      onchange={(e) => console.log("Changed:", e.target.value)}
    />
    <button type="submit">Submit</button>
  </form>
);
```

### Using listeners Object

For multiple event listeners on the same element:

```typescript
import { Base } from "@jay-js/system";

const element = Base({
  tag: "div",
  listeners: {
    click: (e) => console.log("click"),
    mouseenter: (e) => console.log("mouseenter"),
    mouseleave: (e) => console.log("mouseleave")
  },
  children: "Hover and click me"
});
```

## Migration from @jay-js/jsx

If you were using the deprecated `@jay-js/jsx` package, follow these steps:

### 1. Update Dependencies

```bash
npm uninstall @jay-js/jsx
npm install @jay-js/system
```

### 2. Update tsconfig.json

```diff
{
  "compilerOptions": {
-   "jsxImportSource": "@jay-js/jsx"
+   "jsxImportSource": "@jay-js/system"
  }
}
```

### 3. Update vite.config.ts

```diff
export default defineConfig({
  esbuild: {
-   jsxImportSource: "@jay-js/jsx"
+   jsxImportSource: "@jay-js/system"
  }
});
```

### 4. Update Imports

```diff
- import { Fragment } from "@jay-js/jsx";
+ import { Fragment } from "@jay-js/system";
```

All JSX functionality remains the same - only the import source changes.
