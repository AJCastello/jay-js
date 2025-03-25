# Utility Functions

## Table of Contents
- [DOM Utilities](#dom-utilities)
  - [Selector Functions](#selector-functions)
    - [`selector()`](#selector)
    - [`selectors()`](#selectors)
  - [Rendering Functions](#rendering-functions)
    - [`render()`](#render)
- [Core Utilities](#core-utilities)
  - [`uniKey()`](#unikey)
- [Type Definitions](#type-definitions)
  - [Rendering Types](#rendering-types)
  - [Query Types](#query-types)
- [Usage Examples](#usage-examples)
  - [DOM Selection](#dom-selection)
  - [DOM Rendering](#dom-rendering)
  - [Unique ID Generation](#unique-id-generation)

This directory contains utility functions for DOM manipulation, rendering, and more. These utilities are core components of the @jay-js/system library.

## DOM Utilities

### Selector Functions

#### `selector()`

Selects the first element that matches a CSS selector.

```typescript
function selector<T extends HTMLElement>(
  selector: string,
  target: HTMLElement | Document = document,
  options: TQueryOptions = {}
): T | null
```

**Parameters:**
- `selector`: CSS selector string to match elements against
- `target`: The root element or document to search within (default: document)
- `options`: Additional query configuration options
  - `onlyVisible`: If true, only returns visible elements
  - `includeNested`: If false, excludes nested matches

**Returns:** The first matching element or null if none found

#### `selectors()`

Selects all elements that match a CSS selector.

```typescript
function selectors<T extends NodeListOf<Element>>(
  selector: string,
  target: HTMLElement | Document = document,
  options: TQueryOptions = {}
): T
```

**Parameters:**
- `selector`: CSS selector string to match elements against
- `target`: The root element or document to search within (default: document)
- `options`: Additional query configuration options
  - `onlyVisible`: If true, only returns visible elements
  - `includeNested`: If false, excludes nested matches

**Returns:** NodeList of elements matching the selector

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

## Core Utilities

### `uniKey()`

Generates a unique and random string using cryptographically secure values.

```typescript
function uniKey(
  length = 10,
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789"
): string
```

**Parameters:**
- `length`: Desired length of the string (default: 10)
- `chars`: Character set to use for generating the ID (default: alphanumeric)

**Returns:** A unique alphanumeric string

**Note:** Uniqueness is not mathematically guaranteed; use longer lengths to reduce the probability of collisions.

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

### Query Types

```typescript
// Options for selector functions
type TQueryOptions = {
  onlyVisible?: boolean;   // Only return visible elements
  includeNested?: boolean; // Include elements that are nested within other matches
};
```

## Usage Examples

### DOM Selection

```typescript
import { selector, selectors } from '@jay-js/system';

// Get a single element
const mainContent = selector('#main-content');
if (mainContent) {
  // Apply styles directly to the selected element
  mainContent.classList.add('active');
}

// Get only visible elements
const visibleButtons = selectors('button', document, { onlyVisible: true });
visibleButtons.forEach(button => {
  button.setAttribute('aria-live', 'polite');
});

// Exclude nested elements - useful for complex UIs
const topLevelCards = selectors('.card', document, { 
  includeNested: false 
});
console.log(`Found ${topLevelCards.length} top-level cards`);

// Using with a specific container - great for component isolation
const sidebar = selector('.sidebar');
if (sidebar) {
  const menuItems = selectors('.menu-item', sidebar);
  menuItems.forEach((item, index) => {
    item.setAttribute('data-index', index.toString());
  });
}
```

### DOM Rendering

```typescript
import { render, selector } from '@jay-js/system';
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

### Unique ID Generation

```typescript
import { uniKey } from '@jay-js/system';
import { render, selector } from '@jay-js/system';
import { Box, TextInput, Button } from '@jay-js/ui';

// Generate a default unique ID (10 characters)
const sessionId = uniKey();
console.log('Session ID:', sessionId); // e.g., "A7bC9dE2f0"

// Generate shorter IDs for UI elements
const formId = `form-${uniKey(6)}`;
const inputId = `input-${uniKey(6)}`;

// Use IDs for creating accessible forms
const loginForm = Box({
  id: formId,
  role: 'form',
  ariaLabel: 'Login Form',
  children: [
    TextInput({
      id: inputId,
      label: 'Username',
      placeholder: 'Enter username',
      required: true
    }),
    Button({
      content: 'Submit',
      type: 'submit',
      variant: 'primary',
      className: 'mt-4'
    })
  ]
});

render('#auth-container', loginForm);

// Using unique IDs to connect related elements
const tooltipId = `tip-${uniKey(5)}`;
const helpButton = Button({
  content: '?',
  variant: 'outline',
  ariaDescribedby: tooltipId
});

const tooltip = Box({
  id: tooltipId,
  role: 'tooltip',
  className: 'hidden',
  children: Typography({ content: 'Click for help' })
});

render('#help-section', [helpButton, tooltip]);
```