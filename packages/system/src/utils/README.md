# Utility Functions

## Table of Contents
- [DOM Utilities](#dom-utilities)
  - [Rendering Functions](#rendering-functions)
    - [`render()`](#render)
  - [Element References](#element-references)
    - [`createRef()`](#createref)
- [Naming Conventions](#naming-conventions)
- [Type Definitions](#type-definitions)
  - [Rendering Types](#rendering-types)
  - [Reference Types](#reference-types)
- [Usage Examples](#usage-examples)
  - [DOM Rendering](#dom-rendering)
  - [Element References](#element-references-examples)

This directory contains utility functions for DOM manipulation, rendering, and more. These utilities are core components of the @jay-js/system library.

## DOM Utilities

### Rendering Functions

#### `render()`

Renders content into a target element in the DOM.

```typescript
function render(
  target: TRenderTarget,
  content: TRenderContent,
  options: TRenderOptions = {}
): void
```

**Parameters:**
- `target`: Element or selector to render content into
- `content`: Content to render (can be Node, string, HTMLElement, or array)
- `options`: Optional rendering configuration
  - `insert`: "append" or "prepend" (default: replace content)

**Notes:**
- When providing an array as `content`, any `null` or `undefined` values will be automatically filtered out
- This is useful for conditional rendering where some items may not be present

### Element References

#### `createRef()`

Creates a mutable reference object that persists across renders, allowing access to DOM elements.

```typescript
function createRef<T>(): TRefObject<T>
```

**Returns:** A reference object with a mutable `.current` property (initially `null`)

**Usage with JSX:**

```tsx
import { createRef } from '@jay-js/system';

const inputRef = createRef<HTMLInputElement>();

const SearchForm = () => (
  <div>
    <input
      ref={inputRef}
      type="text"
      placeholder="Search..."
    />
    <button onclick={() => inputRef.current?.focus()}>
      Focus
    </button>
    <button onclick={() => {
      if (inputRef.current) {
        console.log(inputRef.current.value);
      }
    }}>
      Get Value
    </button>
  </div>
);
```

**Usage with Base:**

```typescript
import { Base, createRef } from '@jay-js/system';

const divRef = createRef<HTMLDivElement>();

const element = Base({
  tag: 'div',
  ref: divRef,
  children: 'Hello World',
  onmount: () => {
    console.log('Element mounted:', divRef.current);
  }
});
```

## Naming Conventions

Jay JS uses `handle*` prefix instead of `use*` to avoid confusion with React hooks. This naming convention helps differentiate Jay JS utilities from React-style hooks:

| Old Name | New Name | Module |
|----------|----------|--------|
| `useForm` | `handleForm` | forms |

**Why `handle*` instead of `use*`?**

1. **Avoid React confusion**: The `use*` prefix is strongly associated with React hooks
2. **Clearer intent**: `handle*` better describes the purpose - handling/managing functionality
3. **No hook rules**: Unlike React hooks, these functions don't follow hook rules (can be called anywhere)

**Example:**

```typescript
// Correct - use handleForm
import { handleForm } from '@jay-js/system';

const form = handleForm({
  defaultValues: { email: '', password: '' },
  resolver: zodResolver(loginSchema)
});

// The form object provides methods, not reactive values like hooks
form.register('email');
form.onSubmit((data) => console.log(data));
```

## Type Definitions

### Rendering Types

```typescript
// Options for render function
type TRenderOptions = {
  insert?: "append" | "prepend";
};

// Possible items in a render array
type TRenderContentItem = Node | string | HTMLElement | null | undefined;

// Content types that can be rendered
type TRenderContent = TRenderContentItem | TRenderContentItem[] | null | undefined;

// Target types where content can be rendered
type TRenderTarget = HTMLElement | string | null;
```

### Reference Types

```typescript
// Reference object for DOM elements
type TRefObject<T> = {
  current: T | null;  // The referenced DOM element (null until mounted)
  id?: string;        // Optional identifier for internal tracking
};
```

## Usage Examples

### DOM Rendering

```typescript
import { render } from '@jay-js/system';
import {
  Box, Card, CardBody, CardTitle, Button,
  Typography, Alert, Stack, Avatar, Badge
} from '@jay-js/ui';

// Basic content replacement
render('#app', Typography({
  content: 'Hello World',
  variant: 'h1',
  className: 'text-center'
}));

// Create a complete card component
const userCard = Card({
  className: 'shadow-lg',
  children: [
    CardTitle({ content: 'User Profile' }),
    CardBody({
      children: [
        Box({
          className: 'flex items-center gap-4',
          children: [
            Avatar({
              src: 'https://example.com/avatar.jpg',
              alt: 'User avatar'
            }),
            Typography({
              content: 'John Doe',
              variant: 'h3'
            })
          ]
        }),
        Typography({
          content: 'Frontend Developer',
          className: 'text-gray-600'
        }),
        Button({
          content: 'Edit Profile',
          variant: 'primary',
          className: 'mt-4'
        })
      ]
    })
  ]
});

// Render the card into the container
render('#user-profile', userCard);

// Conditional rendering with authentication state
const isLoggedIn = false;
const userData = isLoggedIn ? { name: 'Jane', role: 'Admin' } : null;

// Easily render different UI based on conditions
render('#header', [
  Typography({
    content: 'Dashboard',
    variant: 'h2'
  }),
  // These null values will be automatically filtered out
  isLoggedIn ? Badge({ content: 'Admin', color: 'red' }) : null,
  userData?.role === 'Admin' ? Alert({ content: 'Admin Mode', variant: 'warning' }) : null
]);

// Working with dynamic lists and conditional data
const notifications = [
  { id: 1, text: 'New message', read: false },
  { id: 2, text: 'Payment received', read: true },
  { id: 3, text: 'Update available', read: false }
];

// Create notification items
const notificationItems = notifications.map(note =>
  Box({
    key: note.id.toString(),
    className: note.read ? 'text-gray-500' : 'text-black font-bold',
    children: [
      Typography({ content: note.text }),
      // Only adds badge if unread
      note.read ? null : Badge({ content: 'New', color: 'blue' })
    ]
  })
);

// Insert items at the top of the notification panel
render('#notification-center', Stack({
  children: notificationItems,
  gap: 'sm'
}), {
  insert: 'prepend'
});
```

### Element References

```typescript
import { createRef, render } from '@jay-js/system';

// Create a reference for an input element
const searchInputRef = createRef<HTMLInputElement>();

// Search component with ref
const SearchBar = () => (
  <div className="search-container">
    <input
      ref={searchInputRef}
      type="text"
      placeholder="Search..."
      className="search-input"
    />
    <button
      onclick={() => {
        // Focus the input when button is clicked
        searchInputRef.current?.focus();
      }}
    >
      Focus
    </button>
    <button
      onclick={() => {
        // Get and log the current value
        const value = searchInputRef.current?.value;
        console.log('Search value:', value);
      }}
    >
      Search
    </button>
    <button
      onclick={() => {
        // Clear the input
        if (searchInputRef.current) {
          searchInputRef.current.value = '';
          searchInputRef.current.focus();
        }
      }}
    >
      Clear
    </button>
  </div>
);

render('#app', SearchBar());

// Using refs with lifecycle hooks
const videoRef = createRef<HTMLVideoElement>();

const VideoPlayer = () => (
  <div
    onmount={() => {
      // Auto-play when mounted
      videoRef.current?.play();
    }}
    onunmount={() => {
      // Cleanup when unmounted
      videoRef.current?.pause();
    }}
  >
    <video ref={videoRef} src="/video.mp4" />
    <button onclick={() => videoRef.current?.play()}>Play</button>
    <button onclick={() => videoRef.current?.pause()}>Pause</button>
  </div>
);

// Multiple refs for complex components
const formRefs = {
  email: createRef<HTMLInputElement>(),
  password: createRef<HTMLInputElement>(),
  submit: createRef<HTMLButtonElement>()
};

const LoginForm = () => (
  <form
    onsubmit={(e) => {
      e.preventDefault();
      const email = formRefs.email.current?.value;
      const password = formRefs.password.current?.value;
      console.log('Login:', { email, password });
    }}
  >
    <input ref={formRefs.email} type="email" name="email" />
    <input ref={formRefs.password} type="password" name="password" />
    <button ref={formRefs.submit} type="submit">Login</button>
  </form>
);
```