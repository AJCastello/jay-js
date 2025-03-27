---
category: Internationalization
categoryId: 3
articleId: 4
slug: i18n-provider
title: I18n Provider
description: Learn how to set up and use the i18n provider in your application
---

# I18n Provider

The i18n provider is responsible for initializing and managing the internationalization system in your application. This guide explains how to set up and use the provider effectively.

## API Reference

### Provider Function

```typescript
// Basic provider syntax
i18nProvider(
  callback: (language: Ti18nLanguages) => void,
  options?: Ii18nOptions
);
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `callback` | `(language: Ti18nLanguages) => void` | Function called after language initialization |
| `options` | `Ii18nOptions` | Configuration options for the i18n system |

### Configuration Type

```typescript
interface Ii18nOptions {
  languages: Array<{
    code: string;
    data?: Record<string, any>;
    import?: () => Promise<Record<string, any>>;
  }>;
  defaultLocale?: string;
  saveToLocalStorage?: boolean;
  localStorageKey?: string;
  nestedKeys?: boolean;
}
```

### Behavior

- **Initialization**: Sets up the i18n system and loads the default language
- **Callback Timing**: The callback is called after the language is loaded
- **Error Handling**: Built-in error handling for language loading failures
- **Dynamic Loading**: Supports both immediate and dynamic language loading
- **Persistence**: Automatically manages localStorage settings when enabled

## Basic Setup

The most common way to set up the i18n system is in your application's entry point:

```typescript
import { i18nProvider } from '@jay-js/system';
import { i18nConfig } from './locales/i18n';

// Initialize i18n before rendering your app
i18nProvider(() => {
  // Render your application here
  renderApp();
}, i18nConfig);
```

## Provider Configuration

The provider accepts two parameters:
1. A callback function that runs after initialization
2. Configuration options for the i18n system

```typescript
import { i18nProvider } from '@jay-js/system';

i18nProvider(
  (language) => {
    // language contains the loaded language data
    console.log('Language loaded:', language.code);
    startApp();
  },
  {
    languages: [...],
    defaultLocale: 'en',
    saveToLocalStorage: true,
    localStorageKey: 'app-language',
    nestedKeys: false
  }
);
```

## Dynamic Loading Example

```typescript
// i18n.ts
import { Ii18nOptions } from '@jay-js/system';

export const i18nConfig: Ii18nOptions = {
  defaultLocale: 'en-US',
  nestedKeys: false,
  saveToLocalStorage: true,
  languages: [
    {
      code: 'en-US',
      import: async () => (await import('./locales/en-us')).default
    },
    {
      code: 'es-ES',
      import: async () => (await import('./locales/es-es')).default
    }
  ]
};

// main.ts
import { i18nProvider } from '@jay-js/system';
import { i18nConfig } from './i18n';

const app = document.querySelector('#app');

i18nProvider(() => {
  // App is rendered after language is loaded
  renderApp(app);
}, i18nConfig);
```

## Provider Behavior

The provider:
1. Accepts and applies configuration options
2. Initializes the language system
3. Loads the default or preferred language
4. Sets up localStorage persistence if enabled
5. Subscribes to language changes
6. Handles dynamic language imports
7. Calls your callback when ready

## Error Handling

The provider includes built-in error handling:

```typescript
i18nProvider(
  (language) => {
    // Safe to use language data here
    startApp();
  },
  {
    languages: [
      {
        code: 'en',
        import: async () => {
          try {
            return (await import('./en.json')).default;
          } catch (error) {
            console.error('Failed to load language:', error);
            return {}; // Fallback empty translations
          }
        }
      }
    ]
  }
);
```

## Type Safety

The provider maintains type safety throughout the initialization process:

```typescript
import { Ii18nOptions, Ti18nLanguages } from '@jay-js/system';

const config: Ii18nOptions = {
  // Type-safe configuration
};

i18nProvider((language: Ti18nLanguages) => {
  // Type-safe language data
}, config);
```