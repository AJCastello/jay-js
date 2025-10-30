# @jay-js/jsx

> A JSX runtime implementation for Jay JS

## Table of Contents

- [Installation](#installation)
- [Overview](#overview)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [JSX Functions](#jsx-functions)
  - [Types](#types)
- [Examples](#examples)
- [Contributing](#contributing)

## Installation

```bash
npm install @jay-js/jsx
# or
yarn add @jay-js/jsx
# or
pnpm add @jay-js/jsx
```

## Overview

`@jay-js/jsx` provides a JSX runtime for Jay JS applications, allowing you to use JSX syntax to create Jay JS components. The package includes:

- JSX runtime functions for production and development environments
- TypeScript declarations for JSX
- Support for automatic JSX transform

This package integrates with `@jay-js/elements` to render HTML elements and components in the browser.

## Usage

Configure your `tsconfig.json` to use the Jay JS JSX runtime with automatic transform:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@jay-js/jsx"
  }
}
```

This configuration enables the modern automatic JSX transform, which means you don't need to manually import JSX functions in your files.

## API Reference

### JSX Functions

#### `jsx(tag, props)`

The main JSX transformation function for production environments.

**Parameters:**
- `tag`: `string | Function` - The HTML tag name or component function
- `props`: `object` - The properties and attributes for the element

**Returns:** `HTMLElement | Promise<HTMLElement>`

#### `jsxDEV(tag, props, key, isStaticChildren, source, self)`

The JSX transformation function for development environments.

**Parameters:**
- `tag`: `string | Function` - The HTML tag name or component function
- `props`: `object` - The properties and attributes for the element
- `key`: `string | null` - The key for the element
- `isStaticChildren`: `boolean` - Whether the children are static
- `source`: `any` - Source information for debugging
- `self`: `any` - Self reference for debugging

**Returns:** `HTMLElement | Promise<HTMLElement>`

#### `Fragment`

A special component for grouping elements without adding extra nodes to the DOM.

**Example:**
```tsx
function MyComponent() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}
```

### Types

The package provides TypeScript declarations for JSX elements:

```typescript
declare namespace JSX {
  interface IntrinsicElements {
    // HTML elements
    div: TBase<"div">;
    span: TBase<"span">;
    // ... and all other HTML elements
    [elemName: string]: any;
  }
}
```

## Examples

### Basic Component

```tsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

document.body.appendChild(<Greeting name="World" />);
```

### Using Fragment

```tsx
function ItemList({ items }) {
  return (
    <>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </>
  );
}

const list = document.createElement('ul');
list.appendChild(<ItemList items={[{id: 1, name: 'Item 1'}, {id: 2, name: 'Item 2'}]} />);
document.body.appendChild(list);
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
