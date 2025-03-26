---
category: Internationalization
categoryId: 3
articleId: 2
slug: i18n-basic-setup
title: Basic Setup
description: Learn how to configure and initialize the i18n system in your application
---

# Basic Setup

## API Reference

### Configuration

```typescript
// Basic configuration syntax
i18nDefineOptions({
  languages: LanguageConfig[],
  defaultLocale?: string,
  saveToLocalStorage?: boolean,
  localStorageKey?: string,
  nestedKeys?: boolean
});

// Language configuration type
interface LanguageConfig {
  code: string;
  data?: Record<string, any>;
  import?: () => Promise<Record<string, any>>;
}
```

### Core Functions

| Function | Description |
|----------|-------------|
| `i18nDefineOptions()` | Configures the i18n system |
| `initLanguage()` | Initializes the language system |
| `setLanguage()` | Changes the active language |
| `getCurrentLocale()` | Gets the current active language code |
| `useI18n()` | React hook for accessing translations |

## Basic Configuration

The first step is to configure the i18n system by defining your available languages and options:

```typescript
import { i18nDefineOptions, initLanguage } from '@jay-js/system';

// Define translations type
type Translations = {
  'greeting': string;
  'welcome': string;
  'goodbye': string;
};

// Configure the i18n system
i18nDefineOptions({
  languages: [
    {
      code: 'en',
      data: {
        greeting: 'Hello',
        welcome: 'Welcome to our app',
        goodbye: 'Goodbye'
      }
    },
    {
      code: 'es',
      data: {
        greeting: 'Hola',
        welcome: 'Bienvenido a nuestra aplicación',
        goodbye: 'Adiós'
      }
    }
  ],
  defaultLocale: 'en',
  saveToLocalStorage: true,
  localStorageKey: 'app-language'
});

// Initialize the language system
initLanguage();
```

## Configuration Options

### languages

An array of language configurations, each containing:
- `code`: The language identifier (e.g., 'en', 'es')
- `data`: Direct translation data object
- `import`: Function to lazy load translations

### defaultLocale

The fallback language code if no preference is found. Defaults to 'en'.

### saveToLocalStorage

Whether to persist language preference. Defaults to true.

### localStorageKey

The key used for storing the language preference. Defaults to 'jayjs-i18n-default-locale'.

### nestedKeys

Enable support for nested translation keys. Defaults to false.

## Using Translations

After configuration, you can use translations in your components:

```typescript
function MyComponent() {
  const t = useI18n<Translations>();
  
  return (
    <div>
      <h1>{t('greeting')}</h1>
      <p>{t('welcome')}</p>
      <button>{t('goodbye')}</button>
    </div>
  );
}
```

## Language Management

### Changing Languages

You can change the active language at any time:

```typescript
import { setLanguage } from '@jay-js/system';

// Switch to Spanish
setLanguage('es');
```

### Getting Current Language

```typescript
import { getCurrentLocale } from '@jay-js/system';

const currentLang = getCurrentLocale();
console.log(currentLang); // 'en' or 'es'
```

## Type Safety

The i18n system provides TypeScript support to catch missing translations:

```typescript
type Translations = {
  'greeting': string;
  'welcome': string;
};

const t = useI18n<Translations>();

t('greeting'); // OK
t('welcome');  // OK
t('missing');  // TypeScript Error: Argument of type '"missing"' is not assignable to parameter
```