# @jay-js/system - i18n

Internationalization (i18n) support for your Jay-JS applications, offering a flexible and modular approach to manage and switch between different languages.

## Features

- 🌍 **Internationalization (i18n) Support**: Easily add multi-language support to your applications.
- 📦 **Dynamic Imports**: Load language files on-the-fly using dynamic imports to reduce initial load time.
- 🔌 **Hooks & Modules**: Integrated hooks and modular functions for enhanced customization.
- 🚀 **Type Support**: Built with TypeScript for static type checking.

## Installation

You can install the `@jay-js/system` package using npm or yarn:

```bash
npm install @jay-js/system
```

Or, using Yarn:

```bash
yarn add @jay-js/system
```

## Usage

### Provider Setup

First, import the `i18nProvider` from the package:

```typescript
import { i18nProvider } from "@jay-js/system";
```

This provider allows you to initialize the internationalization system and optionsure it according to your needs.

### Optionsuration

To set up the i18n system, you need to define your language optionsurations. Here's an example:

```typescript
import { useI18n } from "@jay-js/system";
import { Ii18nBase } from "./i18nbase.interface";

export const i18nOptions = {
  defaultLocale: "pt-BR",
  languages: [
    {
      code: "pt-BR",
      import: async () => (await import("./lang/pt-br")).i18nPtBr
    },
    {
      code: "en-US",
      import: async () => (await import("./lang/en-us")).i18nEnUs
    }
  ]
}

export const i18n = useI18n<Ii18nBase>();
```

In this optionsuration:

- **defaultLocale**: Specifies the default language to be used.
- **saveToLocalStorage**: Whether to save the current language to local storage.
- **languages**: An array of languages you want to support. Each language has a:
  - **code**: The locale code.
  - **import**: A function that dynamically imports the language file.

### Using the i18n Hook

The `useI18n` hook allows you to translate text based on the current language. Here's how you can use it:

```typescript
const translatedText = i18n("path.to.translation");
```

## Examples

### Dynamically Switching Languages

Using the provided utilities, you can easily switch between different languages:

```typescript
import { setLanguage } from "@jay-js/system";

// Switch to English
setLanguage("en-US");
```

### Translating Text with Data

You can also insert data into your translations:

```typescript
const welcomeMessage = i18n("greetings.welcome", { name: "John" });
```

If your translation is `"greetings": { "welcome": "Hello, {{name}}" }`, this would output: `Hello, John`.

## Conclusion

With the `@jay-js/system`'s i18n functionalities, internationalizing your application is straightforward and modular. You can easily support multiple languages, leverage the power of TypeScript, and ensure a smooth user experience by loading languages on demand.
