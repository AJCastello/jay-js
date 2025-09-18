---
category: Lazy Loading
categoryId: 4
articleId: 1
slug: lazy-overview
title: Lazy Loading Overview
description: Introduction to the lazy loading module system and its benefits.
---

# Lazy Loading

## API Reference

### Main Functions

```typescript
// Basic usage
const lazyComponent = LazyModule({
  module: "ComponentName",
  import: () => import("./path/to/component.js"),
  params?: { prop1: value1 },
  collect?: boolean
}, customLoader?);

// Configuration
setLazyOptions({
  gcThreshold?: number, // Time in ms before unused modules are collected
  gcInterval?: number,  // Time in ms between collection cycles
  defaultLoader?: HTMLElement | DocumentFragment
});
```

## Overview

The Lazy Loading Module System optimizes application performance by dynamically loading JavaScript/TypeScript modules only when needed. This approach significantly reduces initial load times and memory usage by deferring the loading of non-critical resources until they are required.

## Benefits

- **Improved Initial Load Time**: Only critical modules are loaded when your application starts
- **Reduced Memory Usage**: Modules are loaded when needed and can be unloaded when no longer in use
- **Better User Experience**: Users see content faster because non-essential code is loaded in the background
- **Network Optimization**: Reduces network traffic by loading only what's needed

## Architecture

The system consists of three main components:

1. **LazyModule**: The core function for creating lazy-loadable modules
2. **ModuleCollector**: A background service that manages the lifecycle of loaded modules
3. **Configuration System**: Allows customization of the lazy loading behavior

These components work together to provide an efficient and flexible lazy loading system that adapts to your application's needs.

## Basic Example

Here's a simple example of how to use the lazy loading system:

```javascript
import { LazyModule } from "@jay-js/system";

// Create a lazy-loaded component
function createProfileCard() {
  return LazyModule({
    module: "ProfileCard",
    import: () => import("./components/ProfileCard.js")
  });
}

// Render the component when needed
document.getElementById("profile-container").appendChild(createProfileCard());
```

In this example, the ProfileCard component will only be loaded when the function is called, not at application startup. The system automatically manages the loading process and caching of the imported module. 