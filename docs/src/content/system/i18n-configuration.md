---
category: Internationalization
categoryId: 3
articleId: 2
slug: i18n-configuration
title: I18n Configuration
description: Complete guide to configuring the internationalization system
---

# I18n Configuration

## API Reference

### Configuration Function

```typescript
// Basic configuration syntax
i18nDefineOptions(options: Ii18nOptions);
```

### Configuration Type

```typescript
interface Ii18nOptions {
  languages: LanguageConfig[];
  defaultLocale?: string;
  saveToLocalStorage?: boolean;
  localStorageKey?: string;
  nestedKeys?: boolean;
}

interface LanguageConfig {
  code: string;
  data?: Record<string, any>;
  import?: () => Promise<Record<string, any>>;
}
```

### Parameters

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `languages` | `LanguageConfig[]` | Required | Array of language configurations |
| `defaultLocale` | `string` | `'en'` | Default language code |
| `saveToLocalStorage` | `boolean` | `true` | Save language preference |
| `localStorageKey` | `string` | `'jayjs-i18n-default-locale'` | Storage key name |
| `nestedKeys` | `boolean` | `false` | Enable nested translation keys |

### Usage Patterns

- **Basic Configuration**: Direct configuration with static translations
- **Dynamic Loading**: Configuration with lazy-loaded translations
- **Mixed Approach**: Static data for critical translations with dynamic loading for others
- **Framework Integration**: Configuration as part of framework initialization

The i18n system offers a flexible configuration API through the `i18nDefineOptions` function. This guide covers all available configuration options and their use cases.

## Configuration Options

Here are all available configuration options:

```typescript
import { i18nDefineOptions } from '@jay-js/system';

i18nDefineOptions({
  // Array of supported languages
  languages: [
    {
      code: 'en',          // Language code
      data?: {...},        // Optional immediate data
      import?: () => {...} // Optional dynamic import
    }
  ],
  
  defaultLocale: 'en',     // Default language code
  saveToLocalStorage: true,// Save language preference
  localStorageKey: 'lang', // Storage key name
  nestedKeys: false        // Enable nested keys
});
```

## Languages Configuration

The `languages` array defines all supported languages:

```typescript
i18nDefineOptions({
  languages: [
    // Immediate data loading
    {
      code: 'en',
      data: {
        'Hello': 'Hello',
        'Welcome': 'Welcome'
      }
    },
    
    // Dynamic loading
    {
      code: 'es',
      import: () => import('./locales/es.json')
    },
    
    // Mixed approach
    {
      code: 'fr',
      data: { /* critical translations */ },
      import: () => import('./locales/fr-extended.json')
    }
  ]
});
```

## Storage Options

Configure how language preferences are stored:

```typescript
i18nDefineOptions({
  // Enable/disable localStorage
  saveToLocalStorage: true,
  
  // Custom storage key (default: 'jayjs-i18n-default-locale')
  localStorageKey: 'my-app-language',
  
  // Other options...
});
```

## Translation Structure

Choose between flat or nested translation keys:

```typescript
// Flat structure (default)
i18nDefineOptions({
  nestedKeys: false,
  languages: [{
    code: 'en',
    data: {
      'welcome.title': 'Welcome',
      'welcome.message': 'Hello there'
    }
  }]
});

// Nested structure
i18nDefineOptions({
  nestedKeys: true,
  languages: [{
    code: 'en',
    data: {
      welcome: {
        title: 'Welcome',
        message: 'Hello there'
      }
    }
  }]
});
```

## Default Language

Configure the default and fallback behavior:

```typescript
i18nDefineOptions({
  // Default language if no preference is found
  defaultLocale: 'en',
  
  languages: [
    {
      code: 'en',
      data: { /* English translations */ }
    },
    // Other languages...
  ]
});
```

## TypeScript Configuration

Type-safe configuration with TypeScript:

```typescript
import type { Ti18nOptions, Ti18nLanguages } from '@jay-js/system';

interface Translations {
  'Hello': string;
  'Welcome': string;
}

const config: Ti18nOptions = {
  languages: [
    {
      code: 'en',
      data: {
        'Hello': 'Hello',
        'Welcome': 'Welcome'
      }
    }
  ] as Array<Ti18nLanguages>,
  defaultLocale: 'en',
  saveToLocalStorage: true,
  nestedKeys: false
};

i18nDefineOptions(config);
```

## Configuration Best Practices

1. **Default Language**
   - Always include a default language with immediate data
   - Use a widely supported language as default (e.g., 'en')

2. **Dynamic Loading**
   - Use dynamic imports for non-default languages
   - Consider bundling critical translations with default language

3. **Storage**
   - Use custom storage keys in multi-app environments
   - Consider disabling storage in SSR environments

4. **Structure**
   - Choose between flat or nested based on project size
   - Stay consistent with the chosen structure throughout