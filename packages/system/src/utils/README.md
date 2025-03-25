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
  mainContent.style.backgroundColor = '#f0f0f0';
}

// Get only visible elements
const visibleButtons = selectors('button', document, { onlyVisible: true });
visibleButtons.forEach(button => {
  console.log('Visible button:', button.textContent);
});

// Exclude nested elements
const topLevelItems = selectors('.item', document, { 
  includeNested: false 
});
console.log(`Found ${topLevelItems.length} top-level items`);

// Using with a specific container
const sidebar = selector('.sidebar');
if (sidebar) {
  const sidebarLinks = selectors('a', sidebar);
  console.log(`Sidebar has ${sidebarLinks.length} links`);
}
```

### DOM Rendering

```typescript
import { render } from '@jay-js/system';
import { Box, Typography } from '@jay-js/ui';

// Replace content
render('#app', 'Hello World');

// Render an HTML element
const paragraph = document.createElement('p');
paragraph.textContent = 'This is a paragraph';
render('#app', paragraph);

// Render UI components
render('#app', Box({ 
  className: 'container',
  children: Typography({ content: 'Welcome to our app' })
}));

// Append multiple elements
const header = document.createElement('header');
const main = document.createElement('main');
render('#app', [header, main], { insert: 'append' });

// Prepend content
render('#app', Typography({ content: 'IMPORTANT NOTICE' }), { 
  insert: 'prepend' 
});

// Conditional rendering with null/undefined values
const isLoggedIn = false;
const username = undefined;
const welcomeMessage = document.createElement('p');
welcomeMessage.textContent = 'Welcome!';

render('#app', [
  welcomeMessage,
  isLoggedIn ? document.createElement('button') : null,
  username && document.createElement('span')
]);
// Only the welcomeMessage will be rendered, null and undefined are filtered
```

### Unique ID Generation

```typescript
import { uniKey } from '@jay-js/system';

// Generate a default unique ID (10 characters)
const defaultId = uniKey();
console.log('Default ID:', defaultId); // e.g., "A7bC9dE2f0"

// Generate a longer ID for better uniqueness
const longerId = uniKey(20);
console.log('Longer ID:', longerId); // e.g., "A7bC9dE2f0G4hI6jK8lM"

// Custom character set (only lowercase)
const lowercaseId = uniKey(8, 'abcdefghijklmnopqrstuvwxyz');
console.log('Lowercase ID:', lowercaseId); // e.g., "abcdefgh"

// Use case: Create HTML elements with unique IDs
const container = document.createElement('div');
container.id = `container-${uniKey(6)}`;
document.body.appendChild(container);
```