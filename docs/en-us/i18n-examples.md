---
category: Internationalization
categoryId: 6
articleId: 6
slug: i18n-examples
title: I18n Examples and Patterns
description: Common usage patterns and examples for the internationalization system
---

# I18n Examples and Patterns

This guide provides practical examples and common patterns for using the internationalization system in different scenarios.

## Complete Application Setup

Here's a complete example of setting up i18n in a typical application:

```typescript
// types/i18n.ts
export interface Translations {
  common: {
    welcome: string;
    loading: string;
    error: string;
  };
  auth: {
    login: string;
    logout: string;
    'email.label': string;
    'email.placeholder': string;
    'password.label': string;
    'password.placeholder': string;
  };
}

// locales/en.ts
export default {
  common: {
    welcome: 'Welcome to our app',
    loading: 'Loading...',
    error: 'An error occurred'
  },
  auth: {
    login: 'Log In',
    logout: 'Log Out',
    'email.label': 'Email Address',
    'email.placeholder': 'Enter your email',
    'password.label': 'Password',
    'password.placeholder': 'Enter your password'
  }
};

// i18n.ts
import { Ii18nOptions, useI18n } from '@jay-js/system';
import type { Translations } from './types/i18n';

export const i18nConfig: Ii18nOptions = {
  defaultLocale: 'en',
  nestedKeys: true,
  saveToLocalStorage: true,
  languages: [
    {
      code: 'en',
      import: () => import('./locales/en')
    },
    {
      code: 'es',
      import: () => import('./locales/es')
    }
  ]
};

export const i18n = useI18n<Translations>();

// main.ts
import { i18nProvider } from '@jay-js/system';
import { i18nConfig } from './i18n';
import { renderApp } from './app';

i18nProvider(() => {
  renderApp();
}, i18nConfig);
```

## Common Components Pattern

Example of creating reusable internationalized components:

```typescript
// components/LoginForm.ts
import { i18n } from '../i18n';

export function LoginForm() {
  return `
    <form>
      <div>
        <label>${i18n('auth.email.label')}</label>
        <input 
          type="email" 
          placeholder="${i18n('auth.email.placeholder')}"
        />
      </div>
      <div>
        <label>${i18n('auth.password.label')}</label>
        <input 
          type="password"
          placeholder="${i18n('auth.password.placeholder')}"
        />
      </div>
      <button>${i18n('auth.login')}</button>
    </form>
  `;
}
```

## Language Switcher Component

A practical example of a language switcher:

```typescript
import { setLanguage, getCurrentLocale } from '@jay-js/system';
import { i18n } from '../i18n';

export function LanguageSwitcher() {
  const currentLocale = getCurrentLocale();
  
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' }
  ];
  
  return `
    <div class="language-switcher">
      <label>${i18n('common.language')}</label>
      <select 
        onchange="handleLanguageChange(event)"
        value="${currentLocale}"
      >
        ${languages.map(lang => `
          <option 
            value="${lang.code}"
            ${currentLocale === lang.code ? 'selected' : ''}
          >
            ${lang.label}
          </option>
        `).join('')}
      </select>
    </div>
  `;
}

function handleLanguageChange(event: Event) {
  const select = event.target as HTMLSelectElement;
  setLanguage(select.value);
}
```

## Dynamic Content Loading

Example of loading translations based on user interaction:

```typescript
import { setLanguage } from '@jay-js/system';
import { i18n } from '../i18n';

async function loadLanguageContent(code: string) {
  try {
    // Show loading state
    showLoading(i18n('common.loading'));
    
    // Change language - this will trigger dynamic import
    await setLanguage(code);
    
    // Update UI
    hideLoading();
    showSuccess(i18n('common.language.changed'));
  } catch (error) {
    hideLoading();
    showError(i18n('common.error.loading'));
  }
}
```

## Formatting with Variables

Advanced example of using translation variables:

```typescript
// types/i18n.ts
interface Translations {
  notifications: {
    'count.none': string;
    'count.one': string;
    'count.many': string;
    'last.updated': string;
  };
}

// Usage in component
function NotificationBadge({ count, lastUpdate }: Props) {
  const message = count === 0
    ? i18n('notifications.count.none')
    : count === 1
      ? i18n('notifications.count.one', { count })
      : i18n('notifications.count.many', { count });
      
  const updated = i18n('notifications.last.updated', {
    time: new Date(lastUpdate).toLocaleTimeString()
  });
  
  return `
    <div>
      <span>${message}</span>
      <small>${updated}</small>
    </div>
  `;
}