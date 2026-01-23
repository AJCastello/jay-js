# Internationalization - @jay-js/system

A lightweight, type-safe internationalization system for JavaScript and TypeScript applications.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
  - [Basic Setup with Flat Keys](#basic-setup-with-flat-keys)
  - [Using Variables in Translations](#using-variables-in-translations)
  - [Setup with Nested Keys](#setup-with-nested-keys)
  - [Lazy Loading Translations](#lazy-loading-translations)
  - [Changing Languages](#changing-languages)
  - [Using i18nProvider](#using-i18nprovider)
- [API Reference](#api-reference)
  - [Core Functions](#core-functions)
  - [Configuration Options](#configuration-options)
  - [Type Definitions](#type-definitions)
- [JSX Integration](#jsx-integration)

## Features

- Type-safe translations with TypeScript support
- Direct string keys with variable substitution (flat approach)
- Optional nested translation keys using dot notation
- Automatic language detection based on browser settings
- Persistent language preferences using localStorage
- Lazy loading of translation files
- Reactive state updates on language change

## Installation

```bash
npm install @jay-js/system
```

## Quick Start

```typescript
import { i18nDefineOptions, initLanguage, getI18n, setLanguage } from "@jay-js/system";

// Define translations
i18nDefineOptions({
  languages: [
    { code: "en", data: { greeting: "Hello", farewell: "Goodbye" } },
    { code: "pt", data: { greeting: "Ola", farewell: "Tchau" } }
  ],
  defaultLocale: "en"
});

// Initialize
initLanguage();

// Get translator function
const t = getI18n<{ greeting: string; farewell: string }>();

console.log(t("greeting")); // "Hello"
setLanguage("pt");
console.log(t("greeting")); // "Ola"
```

## Usage

### Basic Setup with Flat Keys

```typescript
import { i18nDefineOptions, initLanguage, getI18n } from "@jay-js/system";

// Define your translations type with flat keys
type Translations = {
  "Hello": string;
  "Welcome to our app": string;
  "Home": string;
  "About": string;
  "Contact": string;
};

// Configure the i18n system
i18nDefineOptions({
  languages: [
    {
      code: "en",
      data: {
        "Hello": "Hello",
        "Welcome to our app": "Welcome to our app",
        "Home": "Home",
        "About": "About",
        "Contact": "Contact"
      }
    },
    {
      code: "es",
      data: {
        "Hello": "Hola",
        "Welcome to our app": "Bienvenido a nuestra app",
        "Home": "Inicio",
        "About": "Acerca de",
        "Contact": "Contacto"
      }
    }
  ],
  defaultLocale: "en",
  saveToLocalStorage: true,
  localStorageKey: "app-language"
  // Flat keys is the default (nestedKeys: false)
});

// Initialize the language system
initLanguage();

// Get translation function
const t = getI18n<Translations>();

console.log(t("Hello"));                 // "Hello"
console.log(t("Welcome to our app"));    // "Welcome to our app"
```

### Using Variables in Translations

Variable substitution uses `{{variable}}` syntax:

```typescript
import { i18nDefineOptions, initLanguage, getI18n } from "@jay-js/system";

// Define translations with variables
type Translations = {
  "Hello": string;
  "Welcome, {{name}}!": string;
  "You have {{count}} messages": string;
};

i18nDefineOptions({
  languages: [
    {
      code: "en",
      data: {
        "Hello": "Hello",
        "Welcome, {{name}}!": "Welcome, {{name}}!",
        "You have {{count}} messages": "You have {{count}} messages"
      }
    },
    {
      code: "es",
      data: {
        "Hello": "Hola",
        "Welcome, {{name}}!": "Bienvenido, {{name}}!",
        "You have {{count}} messages": "Tienes {{count}} mensajes"
      }
    }
  ],
  defaultLocale: "en"
});

initLanguage();

const t = getI18n<Translations>();
const user = { name: "John", messageCount: 5 };

console.log(t("Hello"));                                           // "Hello"
console.log(t("Welcome, {{name}}!", { name: user.name }));         // "Welcome, John!"
console.log(t("You have {{count}} messages", { count: user.messageCount })); // "You have 5 messages"
```

### Setup with Nested Keys

Enable `nestedKeys: true` to use dot notation for organized translations:

```typescript
import { i18nDefineOptions, initLanguage, getI18n } from "@jay-js/system";

// Define translations with nested structure
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

i18nDefineOptions({
  languages: [
    {
      code: "en",
      data: {
        greeting: {
          welcome: "Welcome to our app, {{name}}!",
          hello: "Hello"
        },
        navigation: {
          home: "Home",
          about: "About",
          contact: "Contact"
        }
      }
    },
    {
      code: "pt",
      data: {
        greeting: {
          welcome: "Bem-vindo ao nosso app, {{name}}!",
          hello: "Ola"
        },
        navigation: {
          home: "Inicio",
          about: "Sobre",
          contact: "Contato"
        }
      }
    }
  ],
  defaultLocale: "en",
  nestedKeys: true  // Enable nested keys
});

initLanguage();

const t = getI18n<Translations>();

console.log(t("greeting.hello"));                              // "Hello"
console.log(t("greeting.welcome", { name: "User" }));          // "Welcome to our app, User!"
console.log(t("navigation.home"));                             // "Home"
```

### Lazy Loading Translations

Load translation files on demand to reduce initial bundle size:

```typescript
import { i18nDefineOptions, initLanguage } from "@jay-js/system";

i18nDefineOptions({
  languages: [
    {
      code: "en",
      data: { /* inline English translations */ }
    },
    {
      code: "es",
      import: () => import("./locales/es.json")  // Lazy load Spanish
    },
    {
      code: "fr",
      import: () => import("./locales/fr.json")  // Lazy load French
    }
  ],
  defaultLocale: "en"
});

initLanguage();
```

### Changing Languages

```typescript
import { setLanguage, getCurrentLocale } from "@jay-js/system";

// Get current locale
console.log(getCurrentLocale()); // "en"

// Switch to Spanish
setLanguage("es");

console.log(getCurrentLocale()); // "es"
```

### Using i18nProvider

The `i18nProvider` function combines configuration, initialization, and reactive updates:

```typescript
import { i18nProvider, getI18n } from "@jay-js/system";

i18nProvider(
  (language) => {
    // Called when language data is loaded/changed
    console.log("Language loaded:", language.code);

    // Re-render your app or update components
    renderApp();
  },
  {
    languages: [
      { code: "en", data: { hello: "Hello" } },
      { code: "es", import: () => import("./locales/es.json") }
    ],
    defaultLocale: "en"
  }
);
```

## API Reference

### Core Functions

#### i18nDefineOptions(options)

Configure the internationalization system.

```typescript
i18nDefineOptions({
  languages: [...],
  defaultLocale: "en",
  saveToLocalStorage: true,
  localStorageKey: "app-language",
  nestedKeys: false
});
```

#### initLanguage()

Initialize the language system. This function:
1. Detects the browser language if available
2. Checks for saved language preference in localStorage
3. Sets the initial language

```typescript
initLanguage();
```

#### getI18n<T>()

Get a type-safe translation function.

```typescript
const t = getI18n<Translations>();

// Basic translation
t("key");

// With variable substitution
t("Hello, {{name}}!", { name: "John" });

// With default value
t("missing.key", {}, { default: "Fallback text" });
```

#### setLanguage(code)

Change the active language.

```typescript
setLanguage("es");
```

#### getCurrentLocale()

Get the current active locale code.

```typescript
const locale = getCurrentLocale(); // "en"
```

#### i18nProvider(onLoad, options?)

Provides internationalization support with reactive language loading.

```typescript
i18nProvider(
  (language) => {
    // Called when language changes
    console.log("Loaded:", language.data);
  },
  options
);
```

### Configuration Options

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `languages` | `Ti18nLanguages[]` | Array of available languages | `[]` |
| `defaultLocale` | `string` | Default locale to use | `"en"` |
| `saveToLocalStorage` | `boolean` | Save language preference to localStorage | `true` |
| `localStorageKey` | `string` | Key for storing language preference | `"jayjs-i18n-default-locale"` |
| `nestedKeys` | `boolean` | Enable nested translation keys with dot notation | `false` |

### Type Definitions

```typescript
type Ti18nLanguages = {
  code: string;
  data?: any;
  import?: () => Promise<any>;
};

type Ti18nOptions = {
  languages: Array<Ti18nLanguages>;
  defaultLocale: string;
  saveToLocalStorage: boolean;
  localStorageKey: string;
  nestedKeys: boolean;
};

interface Ti18nState {
  currentLocale: string;
  language: Ti18nLanguages;
}

// Type utilities for nested paths
type AllPaths<T, Prefix = null> = /* generates all possible dot-notation paths */
type GetTypeAtPath<T, Path> = /* gets type at a specific path */
```

## JSX Integration

```tsx
import { i18nDefineOptions, initLanguage, getI18n, setLanguage, getCurrentLocale } from "@jay-js/system";

type Translations = {
  "Welcome": string;
  "Hello, {{name}}!": string;
  "Switch Language": string;
};

i18nDefineOptions({
  languages: [
    {
      code: "en",
      data: {
        "Welcome": "Welcome",
        "Hello, {{name}}!": "Hello, {{name}}!",
        "Switch Language": "Switch to Portuguese"
      }
    },
    {
      code: "pt",
      data: {
        "Welcome": "Bem-vindo",
        "Hello, {{name}}!": "Ola, {{name}}!",
        "Switch Language": "Mudar para Ingles"
      }
    }
  ],
  defaultLocale: "en"
});

initLanguage();

const App = () => {
  const t = getI18n<Translations>();
  const currentLocale = getCurrentLocale();

  const toggleLanguage = () => {
    setLanguage(currentLocale === "en" ? "pt" : "en");
  };

  return (
    <div>
      <h1>{t("Welcome")}</h1>
      <p>{t("Hello, {{name}}!", { name: "User" })}</p>
      <button onclick={toggleLanguage}>
        {t("Switch Language")}
      </button>
    </div>
  );
};
```

### Reactive Updates with i18nProvider

For reactive UI updates on language change, use `i18nProvider`:

```typescript
import { i18nProvider, getI18n } from "@jay-js/system";

const App = () => {
  const container = document.createElement("div");

  i18nProvider((language) => {
    const t = getI18n<Translations>();

    container.innerHTML = "";
    container.appendChild(
      <div>
        <h1>{t("Welcome")}</h1>
        <p>{t("Hello, {{name}}!", { name: "User" })}</p>
      </div>
    );
  });

  return container;
};
```
