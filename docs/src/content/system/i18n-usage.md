---
slug: i18n-usage
title: Using Translations
excerpt: Learn how to use translations in your components with type safety
hidden: false
---

# Using Translations

The i18n system provides a simple hook-based API for accessing translations in your components. This guide covers the basic usage patterns and advanced features.

## Basic Usage

The `useI18n` hook is the primary way to access translations in your components. Here's how to use it:

```typescript
import { useI18n } from '@jay-js/system';

// Define your translations type
type Translations = {
  'Hello': string;
  'Welcome to our app': string;
};

function MyComponent() {
  const t = useI18n<Translations>();
  
  return (
    <div>
      <h1>{t('Hello')}</h1>
      <p>{t('Welcome to our app')}</p>
    </div>
  );
}
```

## Using Variables

You can include dynamic content in your translations using variables:

```typescript
type Translations = {
  'Welcome, {{name}}!': string;
  'You have {{count}} messages': string;
};

function MyComponent() {
  const t = useI18n<Translations>();
  const user = { name: 'John', messageCount: 5 };
  
  return (
    <div>
      <p>{t('Welcome, {{name}}!', { name: user.name })}</p>
      <p>{t('You have {{count}} messages', { count: user.messageCount })}</p>
    </div>
  );
}
```

## Using Nested Keys

When working with nested translations (requires `nestedKeys: true` in config):

```typescript
type Translations = {
  greeting: {
    welcome: string;
    hello: string;
  };
  navigation: {
    home: string;
    about: string;
  };
};

function MyComponent() {
  const t = useI18n<Translations>();
  
  return (
    <div>
      <h1>{t('greeting.hello')}</h1>
      <p>{t('greeting.welcome')}</p>
      <nav>
        <a href="/">{t('navigation.home')}</a>
        <a href="/about">{t('navigation.about')}</a>
      </nav>
    </div>
  );
}
```

## Default Values

You can provide default values for missing translations:

```typescript
function MyComponent() {
  const t = useI18n<Translations>();
  
  return (
    <div>
      {t('missing.key', {}, { default: 'Fallback Text' })}
    </div>
  );
}
```

## Type Safety

The system provides full type safety for your translations:

- Keys must exist in your translations type
- Variables are type-checked
- Nested paths are validated
- TypeScript will catch errors at compile time

```typescript
// This will cause a TypeScript error
t('non.existent.key');

// This will cause a TypeScript error if 'name' is not defined in the translations
t('Welcome', { wrongVariable: 'John' });
```