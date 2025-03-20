# Utility Functions

## Index
- [DOM Utilities](#dom-utilities)
  - [Rendering Functions](#rendering-functions)
  - [DOM Querying](#dom-querying)
- [Type Definitions](#type-definitions)
- [Usage Examples](#usage-examples)
  - [Rendering Content](#rendering-content)
  - [DOM Manipulation Examples](#dom-manipulation-examples)

## Table of Contents
- [DOM Utilities](#dom-utilities)
  - [Rendering Functions](#rendering-functions)
  - [DOM Manipulation](#dom-manipulation)
- [Type Definitions](#type-definitions)
- [Usage Examples](#usage-examples)
  - [Rendering Content](#rendering-content)
  - [DOM Manipulation Examples](#dom-manipulation-examples)

This directory contains utility functions for DOM manipulation, rendering, and more.

## DOM Utilities

### Rendering Functions

The rendering utilities provide functions to manipulate the DOM:

- `render(target, content, options)`: Renders content into a target element with options for insertion method.
- `createElement(tag, attributes, content)`: Creates an HTML element with specified attributes and content.
- `clearElement(element)`: Removes all child nodes from an element.
- `replaceElement(oldElement, newElement)`: Replaces one element with another in the DOM.

### DOM Querying

Query utilities for DOM element selection:

- `selector(query)`: Selects a single element using a CSS selector.
- `selectorAll(query, options)`: Selects multiple elements using a CSS selector with filtering options.

## Type Definitions

Type definitions for consistent typing across the library:

- `RenderOptions`: Options for content rendering, including insertion method.
- `RenderContent`: Supported types for rendering (Node, string, HTMLElement, arrays, null, undefined).
- `RenderTarget`: Accepted target types for rendering (HTMLElement, string selector, null).
- `QueryOptions`: Options for DOM queries, including visibility and nesting filters.

## Usage Examples

### Rendering Content

```typescript
import { render } from './dom/render.js';

// Append content to an element
render('#app', 'Hello World', { insert: 'append' });

// Replace content in an element
render('#app', '<p>New content</p>');

// Prepend content to an element
render('#app', document.createElement('div'), { insert: 'prepend' });
```

### DOM Manipulation Examples

```typescript
import { clearElement, replaceElement } from '@jay-js/system';

// Clear container
const container = selector('#container');
clearElement(container);

// Replace elements
const oldEl = selector('#old');
const newEl = document.createElement('div');
replaceElement(oldEl, newEl);
```
