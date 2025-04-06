# @jay-js/jsx

> A JSX runtime implementation for Jay JS

## Table of Contents

- [Installation](#installation)
- [Overview](#overview)
- [Usage](#usage)
  - [Method 1: TSConfig Setup](#method-1-tsconfig-setup)
  - [Method 2: Vite Plugin](#method-2-vite-plugin)
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
- A Vite plugin for seamless integration

This package integrates with `@jay-js/ui` to render HTML elements and components in the browser.

## Usage

There are two main ways to use JSX in your Jay JS projects:

### Method 1: TSConfig Setup

Configure your `tsconfig.json` to use the Jay JS JSX runtime:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@jay-js/jsx"
  }
}
```

### Method 2: Vite Plugin

For Vite projects, use the included plugin in your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import { jayJsxPlugin } from '@jay-js/jsx';

export default defineConfig({
  plugins: [
    jayJsxPlugin()
  ]
});
```

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
import { Fragment } from '@jay-js/jsx';

function MyComponent() {
  return (
    <Fragment>
      <h1>Title</h1>
      <p>Paragraph</p>
    </Fragment>
  );
}
```

#### `jayJsxPlugin()`

Vite plugin for using Jay JS JSX in Vite projects.

**Returns:** `Plugin` - A Vite plugin

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
/** @jsx jsx */
import { jsx } from '@jay-js/jsx';

function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

document.body.appendChild(<Greeting name="World" />);
```

### Using Fragment

```tsx
/** @jsx jsx */
import { jsx, Fragment } from '@jay-js/jsx';

function ItemList({ items }) {
  return (
    <Fragment>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </Fragment>
  );
}

const list = document.createElement('ul');
list.appendChild(<ItemList items={[{id: 1, name: 'Item 1'}, {id: 2, name: 'Item 2'}]} />);
document.body.appendChild(list);
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
