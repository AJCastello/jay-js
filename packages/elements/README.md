# @jay-js/elements

A foundational library of basic HTML element wrappers for the Jay-JS framework. This package provides type-safe, lightweight components built on top of native DOM elements with enhanced functionality for modern web applications.

## Features

- **Type-safe HTML elements** - Full TypeScript support with proper element typing
- **Lifecycle management** - Built-in `onmount` and `onunmount` callbacks using custom elements
- **Tailwind CSS integration** - Intelligent class merging using `tailwind-merge`
- **Promise-based children** - Support for lazy-loading content with promise resolution
- **Flexible styling** - Support for inline styles, CSS classes, and style objects
- **Event handling** - Direct event handlers (onclick, oninput, etc.) and `listeners` prop support
- **Reference system** - React-like ref system for direct DOM access
- **Custom element support** - Automatic custom element registration for lifecycle-enabled components

## Installation

```bash
npm install @jay-js/elements
```

## Usage

### Basic Element Creation

```typescript
import { Button, Input, Typography } from "@jay-js/elements";

// Create a button
const button = Button({
  children: "Click me",
  className: "btn btn-primary",
  onclick: () => console.log("Button clicked!"),
});

// Create an input
const input = Input({
  type: "text",
  placeholder: "Enter your name",
  className: "input input-bordered",
});

// Create text
const text = Typography({
  tag: "h1",
  children: "Welcome to Jay-JS",
  className: "text-2xl font-bold",
});

document.body.append(button, input, text);
```

### Event Handling

```typescript
import { Button, Input } from "@jay-js/elements";

// Direct event handlers (recommended)
const button = Button({
  children: "Click me",
  onclick: (event) => console.log("Clicked!", event),
  onmouseenter: () => console.log("Mouse entered"),
});

const input = Input({
  type: "text",
  oninput: (event) => console.log("Input value:", event.target.value),
  onblur: () => console.log("Input lost focus"),
  onfocus: () => console.log("Input focused"),
});

// Alternative: using listeners prop
const buttonWithListeners = Button({
  children: "Alternative way",
  listeners: {
    click: () => console.log("Clicked via listeners"),
  },
});
```

### Lifecycle Management

```typescript
import { Box } from "@jay-js/elements";

const component = Box({
  children: "Component with lifecycle",
  onmount: (element) => {
    console.log("Component mounted:", element);
  },
  onunmount: (element) => {
    console.log("Component unmounted:", element);
  },
});
```

### Promise-based Children

```typescript
import { Box } from "@jay-js/elements";

// Lazy loading content
const asyncData = fetch("/api/data").then(res => res.text());

const container = Box({
  children: [
    "Loading...",
    asyncData, // This will replace the loading text when resolved
  ],
});
```

### Using References

```typescript
import { Input, useRef } from "@jay-js/elements";

const inputRef = useRef<HTMLInputElement>();

const input = Input({
  ref: inputRef,
  type: "text",
});

// Access the element directly
setTimeout(() => {
  inputRef.current?.focus();
}, 1000);
```

## Available Components

This package exports the following elements and utilities:

### Core Elements
- **Base** - The foundational element builder (use only for specific HTML tags not covered by other components)
- **Button** - HTML button element wrapper
- **Input** - Generic input element wrapper
- **TextInput** - Text input with pre-configured type
- **TextArea** - Textarea element wrapper
- **Form** - Form element wrapper
- **Typography** - Text elements (p, h1, h2, span, label, headings, etc.)

### UI Elements
- **Box** - Generic container element
- **Section** - Section element wrapper
- **Link** - Anchor element wrapper
- **Img** - Image element wrapper
- **Fragment** - Document fragment wrapper
- **Outlet** - Special div for routing (display: contents)

### Form Elements
- **Checkbox** - Checkbox input wrapper
- **Radio** - Radio input wrapper
- **Range** - Range input wrapper
- **Select** - Select element wrapper
- **SelectItem** - Option element for selects
- **FileInput** - File input wrapper

### List Elements
- **List** - List container (ul/ol)
- **ListItem** - List item element

### Other Elements
- **Progress** - Progress bar element

### Utilities
- **useRef** - Reference creation utility
- **mergeClasses** - Tailwind-aware class merging
- **uniKey** - Unique key generation

## When to Use Base vs Specific Components

Most of the time, you should use the specific components instead of `Base`:

```typescript
// ✅ Preferred - use specific components
const container = Box({ children: "Content" }); // instead of Base({ tag: "div" })
const text = Typography({ tag: "h1", children: "Title" }); // for text elements
const btn = Button({ children: "Click" }); // for buttons

// ✅ Use Base only for specific HTML tags not covered by other components
const article = Base({ tag: "article", children: "Article content" });
const aside = Base({ tag: "aside", children: "Sidebar" });
const time = Base({ tag: "time", datetime: "2023-01-01", children: "Jan 1, 2023" });
```

**Typography component** is especially useful as it extends Base with a default `p` tag but allows you to change it to any text-focused tag like `span`, `label`, `h1`-`h6`, making your code more semantic and readable.

## Architecture

All components in this package are built using the `Base` function, which provides:

1. **Element Creation** - Creates native DOM elements with the specified tag
2. **Property Assignment** - Applies all HTML properties and attributes
3. **Class Management** - Merges CSS classes intelligently with Tailwind support
4. **Event Handling** - Attaches event listeners from the `listeners` prop
5. **Styling** - Applies inline styles and CSS classes
6. **Children Management** - Handles text, elements, arrays, and promises as children
7. **Lifecycle Support** - Registers custom elements for components with lifecycle methods

## TypeScript Support

The package is fully typed with TypeScript, providing:

- Full HTML element property support for each component
- Type-safe event handlers
- Proper return types for each element
- Generic support for custom tag specification

```typescript
// Type-safe button with all HTMLButtonElement properties and direct event handlers
const button = Button({
  type: "submit",
  disabled: false,
  form: "my-form",
  children: "Submit",
  onclick: (event: MouseEvent) => console.log("Form submitted"),
  onmouseenter: () => console.log("Button hovered"),
});

// Type-safe input with direct event handlers
const input = Input({
  type: "email",
  required: true,
  oninput: (event: Event) => {
    const target = event.target as HTMLInputElement;
    console.log("Email:", target.value);
  },
  onblur: () => console.log("Email field blurred"),
});

// Use Base only for specific tags not covered by other components
const article = Base({
  tag: "article" as const,
  role: "main",
  children: "Article content",
});
```

## Integration with Jay-JS Ecosystem

This package is designed to work seamlessly with other Jay-JS packages:

- **@jay-js/system** - For reactive state and form management
- **@jay-js/cli** - For project scaffolding and development
- **@jay-js/jsx** - For JSX-like syntax support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License - see the [LICENSE](LICENSE) file for details.