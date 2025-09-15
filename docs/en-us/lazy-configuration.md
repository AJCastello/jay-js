---
category: Lazy Loading
categoryId: 4
articleId: 4
slug: lazy-configuration
title: Configuration Options
description: Learn how to configure the lazy loading system to optimize performance and memory usage.
---

# Configuration Options

## API Reference

### Setting Options

```typescript
import { setLazyOptions } from "@jay-js/system";

// Update configuration
setLazyOptions({
  gcThreshold?: number,   // Time in ms before unused modules are collected
  gcInterval?: number,    // Time in ms between collection cycles
  defaultLoader?: HTMLElement | DocumentFragment // Default loader element
});
```

### Configuration Types

```typescript
interface TLazyOptions {
  gcThreshold?: number;   // Time in ms before unused modules are collected
  gcInterval?: number;    // Time in ms between collection cycles
  defaultLoader?: HTMLElement | DocumentFragment;
}
```

### Configuration Events

```typescript
import { 
  addConfigChangeListener,
  removeConfigChangeListener
} from "@jay-js/system";

// Register a callback for config changes
const callback = (options) => {
  console.log("New configuration:", options);
};

addConfigChangeListener(callback);

// Later, remove the callback
removeConfigChangeListener(callback);
```

## Overview

The lazy loading system provides a flexible configuration API that allows you to fine-tune its behavior to match your application's needs. Configuration options control garbage collection timing, intervals, and default loader elements.

## Default Configuration

By default, the system uses these configuration values:

```typescript
const defaultOptions = {
  gcThreshold: 300000,  // 5 minutes in milliseconds
  gcInterval: 60000,    // 1 minute in milliseconds
};
```

## Configuration Options

### gcThreshold

The `gcThreshold` option defines how long a module should remain unused before it's eligible for garbage collection:

```typescript
// Set unused modules to be collected after 10 minutes
setLazyOptions({
  gcThreshold: 600000 // 10 minutes in milliseconds
});
```

A higher threshold keeps modules in memory longer, which can be useful for modules that are accessed infrequently but need fast response times when used.

### gcInterval

The `gcInterval` option sets how frequently the garbage collector runs:

```typescript
// Run garbage collection every 2 minutes
setLazyOptions({
  gcInterval: 120000 // 2 minutes in milliseconds
});
```

Longer intervals mean less frequent collection, which can reduce CPU overhead but potentially keep unused modules in memory longer.

### defaultLoader

The `defaultLoader` option lets you specify a default loading element to be shown while modules are loading:

```typescript
// Create a custom loader element
const loader = document.createElement("div");
loader.className = "global-loader";
loader.innerHTML = `<div class="spinner"></div>`;

// Set it as the default loader
setLazyOptions({
  defaultLoader: loader
});
```

This loader will be used for all lazy modules that don't specify their own loader.

## Dynamic Configuration

The configuration can be updated at any time, and changes are applied immediately:

```typescript
// During high-activity periods, use aggressive collection
setLazyOptions({
  gcThreshold: 120000,  // 2 minutes
  gcInterval: 30000     // 30 seconds
});

// During low-activity periods, use relaxed collection
setLazyOptions({
  gcThreshold: 600000,  // 10 minutes
  gcInterval: 180000    // 3 minutes
});
```

## Configuration Change Listeners

You can register listeners to be notified when configuration changes:

```typescript
import { addConfigChangeListener } from "@jay-js/system";

// Update UI when configuration changes
addConfigChangeListener((options) => {
  updateConfigDisplay(options);
});

// Log configuration changes
addConfigChangeListener((options) => {
  console.log("Lazy loading configuration updated:", options);
});
```

These listeners are useful for components that need to adapt to configuration changes, such as custom monitoring tools or debugging interfaces.

## Performance Tuning

### Memory Optimization

To optimize memory usage, use shorter threshold and interval values:

```typescript
// Memory-optimized configuration
setLazyOptions({
  gcThreshold: 180000,  // 3 minutes
  gcInterval: 30000     // 30 seconds
});
```

### Performance Optimization

For performance-critical applications where memory is less of a concern:

```typescript
// Performance-optimized configuration
setLazyOptions({
  gcThreshold: 900000,  // 15 minutes
  gcInterval: 300000    // 5 minutes
});
```

### Disabling Collection

In extreme cases, you can effectively disable garbage collection:

```typescript
// Practically disable garbage collection
setLazyOptions({
  gcThreshold: Number.MAX_SAFE_INTEGER,
  gcInterval: 3600000  // 1 hour
});
```

## Best Practices

1. **Start with defaults**: The default values work well for most applications
2. **Monitor memory usage**: Adjust settings based on observed memory patterns
3. **Consider user patterns**: Set longer thresholds for modules likely to be reused
4. **Test extensively**: Measure the impact of configuration changes before deploying 