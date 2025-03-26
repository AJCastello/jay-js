---
category: Internationalization
categoryId: 3
articleId: 4
slug: i18n-languages
title: Defining Languages
description: Learn how to configure and manage languages in your internationalized application
---

# Defining Languages

## API Reference

### Language Configuration

```typescript
// Language configuration type
interface LanguageConfig {
  code: string;            // Language identifier (e.g., 'en', 'es')
  data?: Record<string, any>; // Direct translation data
  import?: () => Promise<Record<string, any>>; // Lazy loading function
}

// In i18nDefineOptions
{
  languages: LanguageConfig[];
  // ...other options
}
```

### Language Management Functions

| Function | Description |
|----------|-------------|
| `setLanguage(code)` | Changes the active language to the specified code |
| `getCurrentLocale()` | Returns the current active language code |
| `initLanguage()` | Initializes the language system with configured languages |

### Loading Patterns

- **Direct Loading**: Provide translations directly in the `data` property
- **Dynamic Import**: Use the `import` function to load translations on demand
- **Hybrid Loading**: Combine both approaches for critical vs. additional translations

The i18n system supports multiple approaches to defining and managing your application's languages. This guide covers the different ways to set up your language configurations.

## Static Language Data

The simplest approach is to include language data directly in your configuration:

```typescript
import { i18nDefineOptions } from '@jay-js/system';

i18nDefineOptions({
  languages: [
    {
      code: 'en',
      data: {
        'Hello': 'Hello',
        'Welcome': 'Welcome',
        'About': 'About'
      }
    },
    {
      code: 'es',
      data: {
        'Hello': 'Hola',
        'Welcome': 'Bienvenido',
        'About': 'Acerca de'
      }
    }
  ],
  defaultLocale: 'en'
});
```

## Dynamic Loading

For better performance, you can lazy load language files:

```typescript
i18nDefineOptions({
  languages: [
    {
      code: 'en',
      data: enTranslations  // Base language loaded immediately
    },
    {
      code: 'es',
      import: () => import('./locales/es.json')  // Loaded on demand
    },
    {
      code: 'fr',
      import: () => import('./locales/fr.json')
    }
  ],
  defaultLocale: 'en'
});
```

## Language File Structure

### Flat Structure
```typescript
// en-us.ts
const translations = {
  'Hello': 'Hello',
  'Welcome, {{name}}!': 'Welcome, {{name}}!',
  'About Us': 'About Us'
};

export default translations;
```

### Nested Structure
```typescript
// en-us.ts
const translations = {
  common: {
    hello: 'Hello',
    welcome: 'Welcome, {{name}}!'
  },
  navigation: {
    home: 'Home',
    about: 'About Us',
    contact: 'Contact'
  }
};

export default translations;
```

## TypeScript Integration

Define types for your translations to ensure type safety:

```typescript
// i18n.types.ts
export interface Translations {
  // Flat structure
  'Hello': string;
  'Welcome, {{name}}!': string;
  
  // Or nested structure
  common: {
    hello: string;
    welcome: string;
  };
  navigation: {
    home: string;
    about: string;
  };
}

// Use with your configuration
import { useI18n } from '@jay-js/system';
export const i18n = useI18n<Translations>();
```

## Language Detection

The system automatically:
1. Checks browser language settings
2. Looks for stored preferences in localStorage
3. Falls back to the default locale

You can override this behavior in your configuration:

```typescript
i18nDefineOptions({
  languages: [...],
  defaultLocale: 'en',
  saveToLocalStorage: true,  // Enable/disable persistence
  localStorageKey: 'app-language'  // Custom storage key
});
```