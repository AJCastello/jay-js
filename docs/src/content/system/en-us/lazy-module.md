---
category: Lazy Loading
categoryId: 4
articleId: 2
slug: lazy-module
title: LazyModule Function
description: Learn how to use the LazyModule function to dynamically load components and modules.
---

# LazyModule Function

## API Reference

### Syntax

```typescript
// Basic syntax
const lazyElement = LazyModule(config, loader?);

// Config object
interface ILazyModule {
  module?: string;        // Name of the exported module (optional for default exports)
  import: () => Promise<any>; // Dynamic import function
  params?: Record<string, any>; // Props to pass to the module
  collect?: boolean;     // Whether the module can be garbage collected
  loader?: HTMLElement | DocumentFragment; // Custom loader element
}
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `ILazyModule` | Configuration object for the lazy module |
| `config.module` | `string` | Optional. Name of the exported module. If not provided, a default export is assumed |
| `config.import` | `() => Promise<any>` | Function that returns a dynamic import promise |
| `config.params` | `Record<string, any>` | Optional. Props to pass to the module when instantiated |
| `config.collect` | `boolean` | Optional. Whether the module can be garbage collected. Default: `true` |
| `config.loader` | `HTMLElement \| DocumentFragment` | Optional. Custom loader element to show while loading |
| `loader` | `HTMLElement` | Optional. Loader element to show while module is loading |

### Return Value

| Type | Description |
|------|-------------|
| `HTMLElement` | Element that will be replaced with the loaded module once imported |

## Main Function

The `LazyModule` function is the primary API for lazy loading modules in your application. It allows you to defer the loading of components until they are actually needed, improving your application's performance.

## How It Works

1. When `LazyModule` is called, it creates a placeholder element
2. The import function is executed asynchronously to load the module
3. Once the module is loaded, it is cached and instantiated with the provided parameters
4. The placeholder element is replaced with the actual component
5. Subsequent calls to the same module use the cached version

## Using LazyModule

### Basic Usage

```javascript
import { LazyModule } from "@jay-js/system";

// Function to create a lazy-loaded component
function createLazyComponent() {
  return LazyModule({
    module: "MyComponent",
    import: () => import("./components/MyComponent.js")
  });
}

// Use the lazy component
const container = document.getElementById("app");
container.appendChild(createLazyComponent());
```

### With Parameters

You can pass parameters to the loaded module:

```javascript
function createUserCard(userId) {
  return LazyModule({
    module: "UserCard",
    import: () => import("./components/UserCard.js"),
    params: {
      userId,
      displayName: true,
      showAvatar: true
    }
  });
}

// Use the component with parameters
userContainer.appendChild(createUserCard("user123"));
```

### Custom Loading Element

You can provide a custom loading element to display while the module is loading:

```javascript
// Create a custom loader
const createLoader = () => {
  const loader = document.createElement("div");
  loader.className = "loading-spinner";
  loader.innerHTML = `
    <div class="spinner"></div>
    <p>Loading...</p>
  `;
  return loader;
};

// Use the custom loader with LazyModule
function LazyDataTable() {
  return LazyModule({
    module: "DataTable",
    import: () => import("./components/DataTable.js")
  }, createLoader());
}
```

### Working with Default Exports

If your module uses a default export, you can omit the `module` parameter:

```javascript
// Module with default export
function createDefaultComponent() {
  return LazyModule({
    import: () => import("./components/DefaultComponent.js")
  });
}
```

### Preventing Garbage Collection

For modules that should always stay in memory, you can disable garbage collection:

```javascript
function createPersistentComponent() {
  return LazyModule({
    module: "PersistentComponent",
    import: () => import("./components/PersistentComponent.js"),
    collect: false // This module will never be garbage collected
  });
}
```

## Error Handling

The system includes error handling for common issues:

- If the module fails to import, an error is logged
- If a named export is not found, it tries to use the default export
- If neither the named nor default export exists, an error is thrown

## Best Practices

- Use lazy loading for non-critical components
- Consider disabling collection for frequently used components
- Group related components in the same file to reduce network requests
- Use meaningful module names to identify components in debugging 