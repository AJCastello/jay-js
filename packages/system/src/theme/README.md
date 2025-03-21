# Theme Management System

A flexible and powerful theme management system for web applications.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Basic Usage](#basic-usage)
4. [Configuration Options](#configuration-options)
5. [API Reference](#api-reference)
   - [themeDefineOptions](#themeDefineoptions)
   - [initTheme](#inittheme)
   - [setTheme](#settheme)
   - [prefersColorSchemeDark](#preferscolorschemedark)
6. [Examples](#examples)
   - [Basic Theme Setup](#basic-theme-setup)
   - [Using CSS Classes Instead of Dataset](#using-css-classes-instead-of-dataset)
   - [Custom Theme List](#custom-theme-list)
   - [Event Handling](#event-handling)

## Overview

The Theme Management System provides an easy way to implement theme switching in web applications. It supports:

- Light/dark themes with system preference detection
- LocalStorage persistence of user theme preference
- Both CSS dataset and class-based theme application
- Theme switching with custom events
- TypeScript support

## Installation

```bash
npm install @jay-js/system
```

## Basic Usage

```javascript
import { themeDefineOptions } from '@jay-js/system/theme';

// Configure the theme system
themeDefineOptions({
  defaultTheme: 'light',
  defaultDarkTheme: 'dark',
  themeList: ['light', 'dark', 'high-contrast']
});

// Theme initialization happens automatically when calling themeDefineOptions
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `target` | HTMLElement | document.documentElement | The HTML element to apply the theme to |
| `saveToLocalStorage` | boolean | true | Whether to save theme preferences to localStorage |
| `defaultTheme` | string | "light" | The default theme to use when no preference is saved |
| `defaultDarkTheme` | string | "dark" | The default dark theme to use when system prefers dark mode |
| `localStorageKey` | string | "jayjs-current-theme" | The key to use for saving theme preference in localStorage |
| `useAsDataset` | boolean | true | Whether to apply the theme as a data-theme attribute |
| `useAsClass` | boolean | false | Whether to apply the theme as a CSS class |
| `themeList` | string[] | ["light", "dark"] | List of available themes for class removal when switching |

## API Reference

### themeDefineOptions

Configures the theme system with custom options and initializes the theme.

```typescript
function themeDefineOptions(options: Partial<TThemeOptions>): void
```

Example:
```javascript
themeDefineOptions({
  defaultTheme: 'light-blue',
  defaultDarkTheme: 'dark-blue',
  themeList: ['light-blue', 'dark-blue', 'high-contrast']
});
```

### initTheme

Initializes the theme system based on stored preferences or system settings.

```typescript
function initTheme(): void
```

Example:
```javascript
// Usually called automatically by themeDefineOptions
// but can be called manually to reinitialize
initTheme();
```

### setTheme

Sets the current theme of the application.

```typescript
function setTheme(theme: string): void
```

Example:
```javascript
// Switch to dark theme
setTheme('dark');

// Switch to a custom theme
setTheme('high-contrast');
```

### prefersColorSchemeDark

Checks if the user's system prefers a dark color scheme.

```typescript
function prefersColorSchemeDark(): boolean
```

Example:
```javascript
if (prefersColorSchemeDark()) {
  console.log('Dark mode is enabled on the system');
}
```

## Examples

### Basic Theme Setup

```javascript
import { themeDefineOptions, setTheme } from '@jay-js/system/theme';

// Basic configuration
themeDefineOptions({
  defaultTheme: 'light',
  defaultDarkTheme: 'dark'
});

// Add a theme toggle button
document.getElementById('themeToggle').addEventListener('click', () => {
  const currentTheme = document.documentElement.dataset.theme;
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
});
```

### Using CSS Classes Instead of Dataset

```javascript
import { themeDefineOptions } from '@jay-js/system/theme';

// Use CSS classes for theming
themeDefineOptions({
  useAsDataset: false,
  useAsClass: true,
  themeList: ['light-theme', 'dark-theme', 'high-contrast-theme'],
  defaultTheme: 'light-theme',
  defaultDarkTheme: 'dark-theme'
});

// Now themes will be applied as classes:
// <html class="dark-theme"> instead of <html data-theme="dark">
```

### Custom Theme List

```javascript
import { themeDefineOptions, setTheme } from '@jay-js/system/theme';

// Setup multiple themes
themeDefineOptions({
  themeList: ['light', 'dark', 'sepia', 'high-contrast'],
  defaultTheme: 'light',
  defaultDarkTheme: 'dark'
});

// Theme selector
document.getElementById('themeSelect').addEventListener('change', (e) => {
  setTheme(e.target.value);
});
```

### Event Handling

```javascript
import { themeDefineOptions } from '@jay-js/system/theme';

// Configure theme
themeDefineOptions();

// Listen for theme changes
document.addEventListener('themeChanged', (e) => {
  console.log(`Theme changed to: ${e.detail.theme}`);
  
  // You can perform additional actions when theme changes
  if (e.detail.theme === 'dark') {
    // Update UI elements for dark mode
  }
});
```