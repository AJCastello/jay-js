# Lazy Loading Module System

## Table of Contents
- [Introduction](#introduction)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [LazyModule Usage](#lazymodule-usage)
  - [Basic Usage](#basic-usage)
  - [Custom Loaders](#custom-loaders)
  - [Advanced Configurations](#advanced-configurations)
- [Module Collector](#module-collector)
  - [How It Works](#how-it-works)
  - [Garbage Collection](#garbage-collection)
  - [Idle Detection](#idle-detection)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Performance Considerations](#performance-considerations)
- [Troubleshooting](#troubleshooting)

## Introduction

The Lazy Loading Module System is a sophisticated utility designed to optimize application performance by dynamically loading JavaScript/TypeScript modules only when needed. This approach significantly reduces initial load times and memory usage by deferring the loading of non-critical resources until they are required.

## Key Features

- **On-demand Module Loading**: Imports modules only when they are explicitly requested
- **Intelligent Caching**: Maintains a cache of imported modules to prevent redundant loading
- **Automatic Garbage Collection**: Periodically removes unused modules to free up memory
- **Idle Detection**: Optimizes garbage collection based on user activity
- **Configurable Behavior**: Adjustable thresholds and intervals for fine-tuning performance

## Architecture

The system consists of several components working together:

1. **Core Configuration**: Maintains global settings and module cache
2. **Module Collector**: Manages the lifecycle of imported modules
3. **Type Definitions**: Provides TypeScript interfaces for system components

## LazyModule Usage

The `LazyModule` function is the primary API for lazy loading modules in your application. It provides a simple way to defer loading of modules until they are needed.

### Basic Usage

Here's a simple example of using `LazyModule` to load a component:

```javascript
import { LazyModule } from "@jay-js/system";

// Function to create a lazy-loaded component with named export
function createLazyComponent() {
  return LazyModule({
    module: "MyComponent", // Name of the exported module
    import: () => import("./components/MyComponent.js")
  });
}

// Function to create a lazy-loaded component with default export
function createLazyDefaultComponent() {
  return LazyModule({
    // No need to specify module name for default exports
    import: () => import("./components/DefaultComponent.js")
  });
}

// Use the lazy components
const container = document.getElementById("app");
container.appendChild(createLazyComponent());
container.appendChild(createLazyDefaultComponent());
```

### Custom Loaders

You can provide a custom loader element that will be displayed while the module is loading:

```javascript
import { LazyModule } from "@jay-js/system";

// Create a custom loader
const createLoader = () => {
  const loader = document.createElement("div");
  loader.className = "spinner";
  loader.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner-circle"></div>
      <p>Loading component...</p>
    </div>
  `;
  return loader;
};

// Use the custom loader with LazyModule
function LazyUserProfile() {
  return LazyModule({
    module: "UserProfile",
    import: () => import("./components/UserProfile.js")
  }, createLoader());
}

// Render in the DOM
document.getElementById("profile-container").appendChild(LazyUserProfile());
```

### Advanced Configurations

You can pass additional options to the `LazyModule` function:

```javascript
import { LazyModule, setLazyOptions } from "@jay-js/system";

// Configure global lazy loading options
setLazyOptions({
  gcThreshold: 300000, // 5 minutes in milliseconds
  gcInterval: 60000    // 1 minute in milliseconds
});

// Create a lazy-loaded module with props and disable garbage collection
function LazyDataTable() {
  return LazyModule({
    module: "DataTable",
    import: () => import("./components/DataTable.js"),
    props: {
      data: fetchData(),
      pageSize: 10,
      sortable: true
    },
    collect: false // Prevent this module from being garbage-collected
  });
}

// Use the component
const tableContainer = document.querySelector(".table-container");
tableContainer.appendChild(LazyDataTable());
```

## Module Collector

The `ModuleCollector` is a singleton class that handles the management of imported modules. It implements a garbage collection mechanism to free up memory by removing modules that haven't been used for a specified period.

### How It Works

The collector runs at regular intervals (configurable via `gcInterval` setting) to check for unused modules. It tracks each module's usage and marks those that haven't been accessed recently for removal from the cache.

Key implementation details:
- Uses the Singleton pattern to ensure only one collector instance exists
- Responds to configuration changes dynamically
- Monitors user activity to optimize collection behavior

### Garbage Collection

The garbage collection process:

1. Iterates through all cached modules
2. Increments the "last used" counter for each module
3. Identifies modules that exceed the threshold for removal
4. Removes identified modules from the cache
5. Logs removal actions when modules are collected

The threshold for removal is determined by the `gcThreshold` configuration value, which represents the number of minutes since a module was last used.

### Idle Detection

The system includes an idle detection mechanism that:

1. Monitors user interactions (mouse movements and keypresses)
2. Resets idle timers when activity is detected
3. Pauses the collector when the application is idle for an extended period
4. Resets module usage counters during prolonged idle periods

## Configuration

The collector behavior can be customized through the following configuration options:

| Option | Description | Default |
|--------|-------------|---------|
| `gcInterval` | Time between collection cycles (in milliseconds) | 60000 (1 minute) |
| `gcThreshold` | Time threshold for marking a module as unused (in milliseconds) | 300000 (5 minutes) |

Configuration changes are applied dynamically without requiring application restart.

## API Reference

### LazyModule

```typescript
function LazyModule(lazy: ILazyModule, loader?: HTMLElement): HTMLElement

interface ILazyModule {
  module?: string;        // Name of the exported module (optional for default exports)
  import: () => Promise<any>; // Dynamic import function
  props?: Record<string, any>; // Props to pass to the module
  collect?: boolean;     // Whether the module can be garbage collected
}
```

### ModuleCollector

```typescript
// Get the singleton instance
const collector = ModuleCollector.getInstance();

// Manually dispose of the collector (rarely needed)
collector.dispose();
```

### Configuration API

```typescript
import { setLazyOptions } from '@jay-js/system';

// Configure the lazy loading system
setLazyOptions({
  gcThreshold: 300000, // 5 minutes
  gcInterval: 60000    // 1 minute
});
```

## Performance Considerations

- The garbage collection process is designed to have minimal impact on application performance
- Collection intervals are automatically adjusted based on user activity
- During periods of inactivity, the system conserves resources by pausing collection
- Use the `collect: false` option for modules that should always stay in memory

## Troubleshooting

**Issue**: Modules are being collected too frequently

**Solution**: Increase the `gcThreshold` value in the configuration:

```typescript
import { setLazyOptions } from '@jay-js/system';

setLazyOptions({
  gcThreshold: 600000 // 10 minutes
});
```

**Issue**: Memory usage continues to grow

**Solution**: Decrease the `gcThreshold` or `gcInterval` to collect unused modules more aggressively:

```typescript
setLazyOptions({
  gcThreshold: 180000, // 3 minutes
  gcInterval: 30000    // 30 seconds
});
```

**Issue**: Module disappears unexpectedly

**Solution**: Set the `collect` option to `false` to prevent garbage collection:

```typescript
LazyModule({
  module: "CriticalComponent",
  import: () => import("./components/CriticalComponent.js"),
  collect: false // Prevents garbage collection
});