---
slug: i18n-overview
title: Internationalization Overview
excerpt: A lightweight, type-safe internationalization system for JavaScript and TypeScript applications
hidden: false
---

# Internationalization (i18n)

The Jay-JS internationalization system provides a lightweight, type-safe solution for managing translations in JavaScript and TypeScript applications. It offers a simple yet powerful API that makes it easy to internationalize your applications while maintaining full type safety.

## Features

- **Type-safe translations**: Full TypeScript support with type inference
- **Flat or nested keys**: Support for both direct string keys and nested structures
- **Variable substitution**: Dynamic content using template variables
- **Automatic language detection**: Based on browser settings
- **Persistent preferences**: Save language preferences to localStorage
- **Lazy loading**: Support for dynamic loading of translation files
- **Simple integration**: Easy to set up and use with any framework

## Basic Concepts

1. **Translation Keys**: Can be either flat strings or nested dot-notation paths
2. **Language Files**: JSON files containing translations for each supported language
3. **Variables**: Template variables in translations using `{{variable}}` syntax
4. **Type Safety**: Full TypeScript support for catching errors at compile time
5. **State Management**: Built-in state management for language switching
6. **Persistence**: Automatic saving and loading of language preferences

## Getting Started

To get started with the internationalization system, you'll need to:

1. Define your translation types and files
2. Configure the i18n system with your languages
3. Initialize the system
4. Use the translation hook in your components

Check the subsequent documentation sections for detailed information on each aspect of the system.