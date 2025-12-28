# Theme Management System

A flexible and powerful theme management system for web applications with advanced theme definitions and mode switching.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Basic Usage](#basic-usage)
4. [Advanced Usage with Theme Definitions](#advanced-usage-with-theme-definitions)
5. [Configuration Options](#configuration-options)
6. [API Reference](#api-reference)
   - [themeDefineOptions](#themeDefineoptions)
   - [initTheme](#inittheme)
   - [setTheme](#settheme)
   - [toggleThemeMode](#togglethememode)
   - [getCurrentTheme](#getcurrenttheme)
   - [prefersColorSchemeDark](#preferscolorschemedark)
7. [Examples](#examples)
   - [Basic Theme Setup](#basic-theme-setup)
   - [Advanced Theme Definitions](#advanced-theme-definitions)
   - [Theme Mode Switching](#theme-mode-switching)
   - [Custom Styles for Themes](#custom-styles-for-themes)
   - [Getting Current Theme Information](#getting-current-theme-information)
   - [Event Handling](#event-handling)

## Overview

The Theme Management System provides an easy way to implement theme switching in web applications. It supports:

- Light/dark themes with system preference detection
- Advanced theme definitions with light/dark variants
- Custom CSS styles per theme and mode
- Theme mode toggling functionality
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
  defaultDarkTheme: 'dark'
});

// Theme initialization happens automatically when calling themeDefineOptions
```

## Advanced Usage with Theme Definitions

```javascript
import { themeDefineOptions, setTheme, toggleThemeMode } from '@jay-js/system/theme';

// Configure theme system with theme definitions
themeDefineOptions({
  themes: [
    { id: "orange", light: "orange-light", dark: "orange-dark" },
    { id: "red", light: "volcano", dark: "cave" },
    { 
      id: "blue", 
      light: "skytheme", 
      dark: "alaska",
      lightStyle: { "text-decoration": "underline" },
      darkStyle: { "font-size": "16px" }
    }
  ]
});

// Set theme by ID - will use appropriate variant based on current mode
setTheme("red");

// Toggle between light and dark modes
const result = toggleThemeMode();
console.log(`Theme: ${result.theme}, Mode: ${result.mode}`);
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
| `themes` | TThemeDefinition[] | undefined | Array of theme definitions with light/dark variants |

### Theme Definition Type

```typescript
type TThemeDefinition = {
  id: string;                           // Unique identifier for the theme
  light: string;                        // Light theme variant name
  dark: string;                         // Dark theme variant name
  lightStyle?: Record<string, string>;  // Optional CSS styles for light mode
  darkStyle?: Record<string, string>;   // Optional CSS styles for dark mode
};
```

## API Reference

### themeDefineOptions

Configures the theme system with custom options and initializes the theme.

```typescript
function themeDefineOptions(options: Partial<TThemeOptions>): void
```

Example:
```javascript
themeDefineOptions({
  themes: [
    { id: "orange", light: "orange-light", dark: "orange-dark" },
    { 
      id: "blue", 
      light: "skytheme", 
      dark: "alaska",
      lightStyle: { "text-decoration": "underline" },
      darkStyle: { "font-size": "16px" }
    }
  ]
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
function setTheme(theme: string, mode?: TThemeMode): void
```

**Behavior with Theme Definitions:**
- If `theme` matches a theme ID in the `themes` array, it applies the appropriate variant based on the current mode
- If `theme` doesn't match any ID, it applies the theme name directly
- Optional `mode` parameter overrides the current mode

Example:
```javascript
// Using theme definitions - applies "red-light" or "red-dark" based on current mode
setTheme('red');

// Direct theme application with mode
setTheme('my-unlisted-theme', 'dark');

// Direct theme application (uses current mode)
setTheme('custom-theme');
```

**Resulting HTML:**
```html
<!-- With theme definitions -->
<body data-theme="red-dark" data-theme-mode="dark">

<!-- Without theme definitions -->
<body data-theme="my-unlisted-theme" data-theme-mode="dark">
```

### toggleThemeMode

Toggles between light and dark theme modes for the current theme.

```typescript
function toggleThemeMode(): TThemeModeResult
```

**Returns:**
```typescript
type TThemeModeResult = {
  theme: string;    // The new theme name
  mode: TThemeMode; // The new mode ("light" | "dark")
};
```

Example:
```javascript
// Current state: <body data-theme="orange-light" data-theme-mode="light">
const result = toggleThemeMode();
// New state: <body data-theme="orange-dark" data-theme-mode="dark">
// Returns: { theme: "orange-dark", mode: "dark" }
```

### getCurrentTheme

Gets the current theme and mode information.

```typescript
function getCurrentTheme(): TThemeModeResult
```

**Returns:**
```typescript
type TThemeModeResult = {
  theme: string;    // The current theme name
  mode: TThemeMode; // The current mode ("light" | "dark")
};
```

Example:
```javascript
// Get current theme info
const current = getCurrentTheme();
// Returns: { theme: "orange-light", mode: "light" }

// Use the returned info
const { theme, mode } = getCurrentTheme();
console.log(`Current theme: ${theme}, Mode: ${mode}`);

// Check current state without changing anything
if (getCurrentTheme().mode === 'dark') {
  console.log('Dark mode is active');
}
```

### prefersColorSchemeDark

Checks if the user's system prefers a dark color scheme.

```typescript
Checks if the user's system prefers a dark color scheme.

```typescript
function prefersColorSchemeDark(): boolean
```

Example:
```javascript
// Check if system is in dark mode
if (prefersColorSchemeDark()) {
  console.log('Dark mode is enabled');
}
```

## Theme Validation and Fallback

The theme system includes automatic validation of stored themes to ensure they exist in the current configuration. This prevents issues when theme configurations change between application versions.

### Validation Process

When `initTheme()` is called (automatically or manually), the system validates any stored theme from localStorage:

1. **Valid Theme**: If the stored theme exists in the current configuration, it's applied directly
2. **Invalid Theme**: If the stored theme doesn't exist, the system falls back to the default theme and logs a warning
3. **Fallback Logic**: Uses the default theme from the themes array or legacy defaults

### What Themes Are Considered Valid

A stored theme is considered valid if it matches any of the following:

- **Theme ID**: Matches the `id` of any theme in the `themes` array
- **Theme Variant**: Matches the `light` or `dark` value of any theme in the `themes` array  
- **Legacy Defaults**: Matches `defaultTheme` or `defaultDarkTheme` values

### Example Validation Scenarios

```javascript
// Configuration
themeDefineOptions({
  defaultTheme: "light",
  defaultDarkTheme: "dark", 
  themes: [
    { id: "orange", light: "orange-light", dark: "orange-dark" },
    { id: "blue", light: "skytheme", dark: "alaska" }
  ]
});

// Valid stored themes:
// - "orange" (theme ID)
// - "orange-light" (light variant)  
// - "orange-dark" (dark variant)
// - "blue" (theme ID)
// - "skytheme" (light variant)
// - "alaska" (dark variant)
// - "light" (legacy default)
// - "dark" (legacy default)

// Invalid stored themes:
// - "purple" (doesn't exist)
// - "orange-medium" (not a valid variant)
// - "old-theme" (removed from configuration)
```

### Handling Configuration Changes

When updating your theme configuration, the validation system ensures a smooth user experience:

```javascript
// Old configuration
themeDefineOptions({
  themes: [
    { id: "red", light: "red-light", dark: "red-dark" },
    { id: "blue", light: "blue-light", dark: "blue-dark" }
  ]
});

// User selects "red" theme, saved to localStorage

// Later - new configuration without "red" theme
themeDefineOptions({
  themes: [
    { id: "green", light: "green-light", dark: "green-dark" },
    { id: "purple", light: "purple-light", dark: "purple-dark" }  
  ]
});

// On next load:
// - Stored theme "red" is no longer valid
// - System logs warning: "Stored theme 'red' is not valid in current configuration. Falling back to default theme."
// - Applies default theme instead
// - User experience remains stable
```

## Examples
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

### Advanced Theme Definitions

```javascript
import { themeDefineOptions, setTheme, toggleThemeMode } from '@jay-js/system/theme';

// Setup theme definitions
themeDefineOptions({
  themes: [
    { id: "orange", light: "orange-light", dark: "orange-dark" },
    { id: "red", light: "volcano", dark: "cave" },
    { 
      id: "blue", 
      light: "skytheme", 
      dark: "alaska",
      lightStyle: { "text-decoration": "underline" },
      darkStyle: { "font-size": "16px" }
    }
  ]
});

// Theme selector
document.getElementById('themeSelect').addEventListener('change', (e) => {
  setTheme(e.target.value);
});

// Mode toggle button
document.getElementById('modeToggle').addEventListener('click', () => {
  const result = toggleThemeMode();
  console.log(`Switched to ${result.theme} (${result.mode} mode)`);
});
```

### Theme Mode Switching

```javascript
import { themeDefineOptions, toggleThemeMode } from '@jay-js/system/theme';

themeDefineOptions({
  themes: [
    { id: "orange", light: "orange-light", dark: "orange-dark" },
    { id: "blue", light: "skytheme", dark: "alaska" }
  ]
});

// Toggle mode while preserving theme
document.getElementById('modeToggle').addEventListener('click', () => {
  const result = toggleThemeMode();
  
  // Update button text based on new mode
  const button = document.getElementById('modeToggle');
  button.textContent = result.mode === 'light' ? '🌙 Dark' : '☀️ Light';
});
```

### Custom Styles for Themes

```javascript
import { themeDefineOptions } from '@jay-js/system/theme';

// Themes with custom styles
themeDefineOptions({
  themes: [
    {
      id: "accessibility",
      light: "high-contrast-light",
      dark: "high-contrast-dark",
      lightStyle: {
        "font-size": "18px",
        "line-height": "1.6",
        "letter-spacing": "0.05em"
      },
      darkStyle: {
        "font-size": "18px",
        "line-height": "1.6",
        "letter-spacing": "0.05em",
        "filter": "contrast(1.2)"
      }
    }
  ]
});

// The styles will be automatically applied to document.documentElement
```

### Getting Current Theme Information

```javascript
import { themeDefineOptions, getCurrentTheme, setTheme } from '@jay-js/system/theme';

// Configure themes
themeDefineOptions({
  themes: [
    { id: "orange", light: "orange-light", dark: "orange-dark" },
    { id: "blue", light: "skytheme", dark: "alaska" }
  ]
});

// Get current theme info
const current = getCurrentTheme();
console.log(`Current: ${current.theme} (${current.mode} mode)`);

// Use current info to make decisions
const { theme, mode } = getCurrentTheme();
if (mode === 'dark') {
  // Apply dark mode specific logic
  document.body.classList.add('dark-mode-animations');
} else {
  document.body.classList.remove('dark-mode-animations');
}

// Update UI based on current theme
function updateThemeIndicator() {
  const { theme, mode } = getCurrentTheme();
  const indicator = document.getElementById('themeIndicator');
  indicator.textContent = `${theme} (${mode})`;
  indicator.className = `indicator ${mode}`;
}

// Call when page loads
updateThemeIndicator();

// Create a theme status component
function createThemeStatus() {
  const { theme, mode } = getCurrentTheme();
  return {
    isLight: mode === 'light',
    isDark: mode === 'dark',
    themeName: theme,
    isOrangeTheme: theme.includes('orange'),
    isBlueTheme: theme.includes('blue') || theme.includes('sky') || theme.includes('alaska')
  };
}

// Usage in conditional rendering
const status = createThemeStatus();
if (status.isDark && status.isBlueTheme) {
  // Special handling for blue dark theme
  applySpecialEffects();
}
```

### Event Handling

```javascript
import { themeDefineOptions, toggleThemeMode } from '@jay-js/system/theme';

// Configure theme
themeDefineOptions({
  themes: [
    { id: "orange", light: "orange-light", dark: "orange-dark" }
  ]
});

// Listen for theme changes
document.addEventListener('themeChanged', (e) => {
  console.log(`Theme changed to: ${e.detail.theme}`);
  console.log(`Mode: ${e.detail.mode}`);
  
  // Update UI elements based on theme and mode
  const isDark = e.detail.mode === 'dark';
  document.getElementById('logo').src = isDark ? '/logo-dark.svg' : '/logo-light.svg';
});

// Button to toggle mode
document.getElementById('toggleMode').addEventListener('click', () => {
  const result = toggleThemeMode();
  // The event listener above will automatically handle the change
});
```

### Using CSS Classes Instead of Dataset

```javascript
import { themeDefineOptions } from '@jay-js/system/theme';

// Use CSS classes for theming
themeDefineOptions({
  useAsDataset: false,
  useAsClass: true,
  themes: [
    { id: "corporate", light: "corporate-light", dark: "corporate-dark" }
  ]
});

// Now themes will be applied as classes:
// <html class="corporate-dark"> instead of <html data-theme="corporate-dark">
```
