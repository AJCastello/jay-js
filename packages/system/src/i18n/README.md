# Internationalization - @jay-js/system

A lightweight, type-safe internationalization system for JavaScript and TypeScript applications.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
  - [Basic Setup with Flat Keys](#basic-setup-with-flat-keys)
  - [Using Variables in Translations](#using-variables-in-translations)
  - [Setup with Nested Keys](#setup-with-nested-keys)
  - [Changing Languages](#changing-languages)
- [API Reference](#api-reference)
  - [Core Functions](#core-functions)
  - [Hooks](#hooks)
  - [Configuration Options](#configuration-options)

## Features

- Type-safe translations with TypeScript support
- Direct string keys with variable substitution (flat approach)
- Optional nested translation keys using dot notation
- Automatic language detection based on browser settings
- Persistent language preferences using localStorage
- Lazy loading of translation files
- React hooks for easy integration

## Usage

### Basic Setup with Flat Keys

```typescript
import { i18nDefineOptions, initLanguage, useI18n } from '@jay-js/system';

// Define your translations type with flat keys
type Translations = {
  'Hello': string;
  'Welcome to our app': string;
  'Home': string;
  'About': string;
  'Contact': string;
};

// Configure the i18n system
i18nDefineOptions({
  languages: [
    {
      code: 'en',
      data: {
        'Hello': 'Hello',
        'Welcome to our app': 'Welcome to our app',
        'Home': 'Home',
        'About': 'About',
        'Contact': 'Contact'
      }
    },
    {
      code: 'es',
      import: () => import('./locales/es.json')
    }
  ],
  defaultLocale: 'en',
  saveToLocalStorage: true,
  localStorageKey: 'app-language',
  // Flat keys is the default (nestedKeys: false)
});

// Initialize the language system
initLanguage();

// Use translations in your components
function MyComponent() {
  const t = useI18n<Translations>();
  
  return (
    <div>
      <h1>{t('Hello')}</h1>
      <p>{t('Welcome to our app')}</p>
      <nav>
        <a href="/">{t('Home')}</a>
        <a href="/about">{t('About')}</a>
        <a href="/contact">{t('Contact')}</a>
      </nav>
    </div>
  );
}
```

### Using Variables in Translations

```typescript
import { i18nDefineOptions, initLanguage, useI18n } from '@jay-js/system';

// Define your translations type with variables in the keys
type Translations = {
  'Hello': string;
  'Welcome, {{name}}!': string;
  'You have {{count}} messages': string;
};

// Configure the i18n system
i18nDefineOptions({
  languages: [
    {
      code: 'en',
      data: {
        'Hello': 'Hello',
        'Welcome, {{name}}!': 'Welcome, {{name}}!',
        'You have {{count}} messages': 'You have {{count}} messages'
      }
    },
    {
      code: 'es',
      data: {
        'Hello': 'Hola',
        'Welcome, {{name}}!': '¡Bienvenido, {{name}}!',
        'You have {{count}} messages': 'Tienes {{count}} mensajes'
      }
    }
  ],
  defaultLocale: 'en'
});

// Initialize the language system
initLanguage();

// Use translations with variables
function MyComponent() {
  const t = useI18n<Translations>();
  const user = { name: 'John', messageCount: 5 };
  
  return (
    <div>
      <h1>{t('Hello')}</h1>
      <p>{t('Welcome, {{name}}!', { name: user.name })}</p>
      <p>{t('You have {{count}} messages', { count: user.messageCount })}</p>
    </div>
  );
}
```

### Setup with Nested Keys

If you prefer organizing translations in a nested structure, you can enable the `nestedKeys` option:

```typescript
import { i18nDefineOptions, initLanguage, useI18n } from '@jay-js/system';

// Define your translations type with nested structure
type Translations = {
  greeting: {
    welcome: string;
    hello: string;
  };
  navigation: {
    home: string;
    about: string;
    contact: string;
  };
};

// Configure the i18n system with nested keys
i18nDefineOptions({
  languages: [
    {
      code: 'en',
      data: {
        greeting: {
          welcome: 'Welcome to our app, {{name}}!',
          hello: 'Hello'
        },
        navigation: {
          home: 'Home',
          about: 'About',
          contact: 'Contact'
        }
      }
    },
    {
      code: 'es',
      import: () => import('./locales/es.json')
    }
  ],
  defaultLocale: 'en',
  saveToLocalStorage: true,
  localStorageKey: 'app-language',
  nestedKeys: true  // Enable nested keys
});

// Initialize the language system
initLanguage();

// Use nested translations in your components
function MyComponent() {
  const t = useI18n<Translations>();
  
  return (
    <div>
      <h1>{t('greeting.hello')}</h1>
      <p>{t('greeting.welcome', { name: 'User' })}</p>
      <nav>
        <a href="/">{t('navigation.home')}</a>
        <a href="/about">{t('navigation.about')}</a>
        <a href="/contact">{t('navigation.contact')}</a>
      </nav>
    </div>
  );
}
```

### Changing Languages

```typescript
import { setLanguage } from '@jay-js/system';

// Switch to Spanish
setLanguage('es');
```

## API Reference

### Core Functions

- `i18nDefineOptions(options)` - Configure the internationalization system
- `initLanguage()` - Initialize the language system with the appropriate language based on preferences
- `setLanguage(code)` - Change the active language
- `getCurrentLocale()` - Get the current active locale code

### Hooks

- `useI18n<T>()` - React hook for accessing internationalized strings with type safety

### Configuration Options

The `i18nDefineOptions` function accepts an object with the following properties:

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `languages` | `Array<Ii18nLanguages>` | Array of available languages | `[]` |
| `defaultLocale` | `string` | Default locale to use if no preference is found | `'en'` |
| `saveToLocalStorage` | `boolean` | Whether to save language preference to localStorage | `true` |
| `localStorageKey` | `string` | Key to use for storing language preference | `'jayjs-i18n-default-locale'` |
| `nestedKeys` | `boolean` | Whether to support nested translation keys | `false` |