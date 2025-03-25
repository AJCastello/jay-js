# @jay-js/ui Hooks

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Hooks](#hooks)
  - [useRef](#useref)
  - [useToast](#usetoast)
  - [useDrawer](#usedrawer)
  - [useListener](#uselistener)
- [Utilities](#utilities)
  - [mergeClasses](#mergeclasses)
  - [uniKey](#unikey)
  - [RenderElements](#renderelements)
- [Examples](#examples)
  - [Using useRef](#using-useref)
  - [Using useToast](#using-usetoast)
  - [Using useDrawer](#using-usedrawer)
  - [Using Utilities](#using-utilities)

## Introduction

This package provides a collection of hooks and utilities for building user interfaces with Jay JS. The hooks and utilities are designed to work with the @jay-js/ui component library and provide common functionality for handling UI interactions.

## Installation

```bash
npm install @jay-js/ui
```

or

```bash
yarn add @jay-js/ui
```

## Hooks

### useRef

Creates a mutable reference object that persists across renders.

#### Type Definition

```typescript
type TRefObject<T> = {
  current: T | null;
}

function useRef<T>(): TRefObject<T>
```

#### Parameters

- None

#### Returns

- `TRefObject<T>`: A reference object with a mutable `.current` property.

### useToast

Creates a function to display toast notifications in a container.

#### Type Definition

```typescript
type TUseToast = {
  for?: string;
}

type TToast<T extends keyof HTMLElementTagNameMap = "div"> = {
  duration?: number;
  vertical?: "toast-top" | "toast-middle" | "toast-bottom";
  horizontal?: "toast-start" | "toast-center" | "toast-end";
  children?: any;
  // Additional props can be passed to the toast component
}

function useToast(props?: TUseToast): (toastProps: TToast<"div">) => void
```

#### Parameters

- `props` (optional): Configuration options for the toast hook
  - `for?: string`: Optional ID of the toast container element

#### Returns

- A function that accepts toast properties and displays a toast notification

#### Throws

- Error: If no toast container element is found

### useDrawer

Controls the visibility and animation of a drawer component.

#### Type Definition

```typescript
type TUseDrawer = {
  for?: string;
  onClose?: () => void;
  onOpen?: () => void;
}

function useDrawer(props: TUseDrawer): () => void
```

#### Parameters

- `props`: Configuration options for the drawer
  - `for?: string`: Optional ID of the drawer element to control
  - `onClose?: () => void`: Callback function triggered when drawer is closed
  - `onOpen?: () => void`: Callback function triggered when drawer is opened

#### Returns

- A function that toggles the drawer's visibility state

### useListener

Handles event listeners by finding and executing the matching event handler.

#### Type Definition

```typescript
type Listener = {
  [K in keyof GlobalEventHandlersEventMap]?: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any;
}

function useListener(type: string, listeners: Listener): void
```

#### Parameters

- `type: string`: The event type to listen for (e.g., 'click', 'input')
- `listeners: Listener`: An object containing event handler functions

#### Returns

- `void`

## Utilities

### mergeClasses

Merges multiple class name strings, filtering out falsy values and resolving Tailwind CSS conflicts.

#### Type Definition

```typescript
function mergeClasses(args: Array<string | undefined>): string
```

#### Parameters

- `args: Array<string | undefined>`: Array of class strings or undefined values

#### Returns

- A single merged class string with Tailwind conflicts resolved

### uniKey

Generates a random string of specified length for use as unique IDs.

#### Type Definition

```typescript
function uniKey(length?: number): string
```

#### Parameters

- `length?: number`: The length of the key to generate (default: 10)

#### Returns

- A string of random characters

### RenderElements

Recursively renders a tree of elements into a target element.

#### Type Definition

```typescript
type TElementData = {
  id?: string;
  name?: string;
  component: (options: any) => any;
  props?: any & { children?: Array<TElementData> };
}

type TRenderElements = {
  data: Array<TElementData>;
  targetElement?: HTMLElement;
}

function RenderElements(options: TRenderElements): HTMLElement
```

#### Parameters

- `options: TRenderElements`: Configuration options for rendering
  - `data: Array<TElementData>`: Array of element data to render
  - `targetElement?: HTMLElement`: Optional target element to render into

#### Returns

- The target element containing all rendered elements

## Examples

### Using useRef

```typescript
import { useRef } from '@jay-js/ui';

// Create a reference to track a DOM element
const elementRef = useRef<HTMLDivElement>();

// Create a component that uses the reference
function MyComponent() {
  const ref = useRef<HTMLDivElement>();
  
  return Base({
    tag: "div",
    ref, // Pass the ref to the Base component
    onmount: (element) => {
      console.log("Element mounted:", element);
    }
  });
}
```

### Using useToast

```typescript
import { useToast, Button, Typography } from '@jay-js/ui';

// First, ensure there's a toast container in your layout
function Layout() {
  return Section({
    children: [
      // Other layout elements
      Div({
        className: "toast-container",
        dataset: {
          vertical: "toast-top",
          horizontal: "toast-end",
          duration: "5000"
        }
      })
    ]
  });
}

// Then use the toast hook in your component
function NotificationButton() {
  const toast = useToast();
  
  return Button({
    children: "Show Notification",
    onclick: () => {
      toast({
        children: Typography({
          children: "This is a notification",
          className: "font-bold"
        }),
        duration: 3000, // 3 seconds
        vertical: "toast-top",
        horizontal: "toast-end"
      });
    }
  });
}
```

### Using useDrawer

```typescript
import { useDrawer, Button, Drawer, DrawerContent, DrawerOverlay } from '@jay-js/ui';

function DrawerExample() {
  const toggleDrawer = useDrawer({
    for: "my-drawer",
    onOpen: () => console.log("Drawer opened"),
    onClose: () => console.log("Drawer closed")
  });
  
  return Section({
    children: [
      Button({
        children: "Open Drawer",
        onclick: toggleDrawer
      }),
      Drawer({
        id: "my-drawer",
        className: "hidden",
        children: [
          DrawerOverlay({
            for: "my-drawer"
          }),
          DrawerContent({
            position: "left", // Options: "left", "right", "top", "bottom"
            children: Typography({
              children: "Drawer Content"
            })
          })
        ]
      })
    ]
  });
}
```

### Using Utilities

```typescript
import { mergeClasses, uniKey, RenderElements } from '@jay-js/ui';

// Using mergeClasses to combine Tailwind classes
const className = mergeClasses([
  "bg-blue-500",
  "hover:bg-blue-700",
  conditionalClass && "text-white"
]);

// Using uniKey to generate a unique ID
const uniqueID = uniKey(8); // e.g., "A3bX9z1P"

// Using RenderElements to create a component tree
RenderElements({
  data: [
    {
      component: Section,
      props: {
        className: "container mx-auto",
        children: [
          {
            component: Typography,
            props: {
              tag: "h1",
              className: "text-2xl",
              children: "Dynamic Component Tree"
            }
          },
          {
            component: Button,
            props: {
              children: "Click Me",
              onclick: () => alert("Button clicked")
            }
          }
        ]
      }
    }
  ]
});
```