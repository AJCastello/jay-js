---
category: Lazy Loading
categoryId: 4
articleId: 3
slug: lazy-collector
title: Module Collector
description: Understanding the ModuleCollector system for managing lazy-loaded modules and memory optimization.
---

# Module Collector

## API Reference

### Singleton Instance

```typescript
// Get the singleton collector instance
import { ModuleCollector } from "@jay-js/system";

const collector = ModuleCollector.getInstance();
```

### Methods

| Method | Syntax | Description |
|--------|--------|-------------|
| `getInstance()` | `ModuleCollector.getInstance()` | Gets the singleton instance of the collector |
| `dispose()` | `collector.dispose()` | Disposes of the collector, clearing intervals and event listeners |

### Internal Functionality

- **Garbage Collection**: Automatically removes unused modules after a configurable period
- **Idle Detection**: Monitors user activity to optimize collection behavior
- **Configuration Adaptation**: Dynamically adjusts to changes in lazy loading options

## Overview

The `ModuleCollector` is a core component of the lazy loading system that manages the lifecycle of imported modules. It implements a sophisticated garbage collection mechanism to free up memory by removing modules that haven't been used for a configurable period.

## How It Works

The collector operates as a background service that:

1. Monitors the cache of imported modules
2. Tracks how long each module has been unused
3. Removes modules that exceed the configured threshold
4. Adapts collection behavior based on user activity
5. Resets module usage counters during idle periods

## Garbage Collection

The garbage collection process runs periodically (configurable via `gcInterval` setting) and removes modules that haven't been accessed recently:

```typescript
// Collection process (simplified)
function runCollector() {
  const toRemove = [];
  
  // Find modules that exceed the threshold
  for (const [key, module] of moduleCache) {
    if (module.lastUsed > gcThreshold && module.collect) {
      toRemove.push({ key, module });
    } else {
      module.lastUsed++;
    }
  }
  
  // Remove the identified modules
  for (const { key } of toRemove) {
    moduleCache.delete(key);
  }
}
```

## Idle Detection

The collector includes an idle detection mechanism that optimizes memory usage:

1. Monitors user interactions (mouse movements and keypresses)
2. Pauses collection during extended idle periods to conserve resources
3. Resets module usage counters when the application is idle

This approach ensures that the garbage collection process doesn't unnecessarily remove modules that might be needed when the user returns to active use.

## Configuration Integration

The collector automatically adapts to changes in the lazy loading configuration:

```typescript
// Update the configuration
import { setLazyOptions } from "@jay-js/system";

setLazyOptions({
  gcThreshold: 600000, // 10 minutes
  gcInterval: 120000   // 2 minutes
});
```

When configuration changes, the collector adjusts its behavior without requiring a restart.

## Memory Optimization

The collector is designed to optimize memory usage in your application:

- Removes unused modules to free up memory
- Responds to user activity to avoid unnecessary collection
- Provides configurable thresholds to fine-tune memory usage

## Internal Implementation

The ModuleCollector is implemented as a singleton class with several internal methods:

1. **Event Listeners**: Monitors user activity to detect idle periods
2. **Collection Intervals**: Periodically runs the garbage collection process
3. **Idle Monitor**: Tracks application idle state

## Advanced Usage

While most applications will never need to interact directly with the collector, advanced use cases might require manual control:

```typescript
// Get the collector instance
const collector = ModuleCollector.getInstance();

// Manually dispose of the collector (rarely needed)
collector.dispose();
```

**Note**: Manually manipulating the collector is rarely necessary and should be done with caution. 