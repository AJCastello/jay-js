/**
 * JAY-JS Internationalization Module
 * 
 * A lightweight, type-safe internationalization system for JavaScript and TypeScript applications.
 * This module provides tools for managing translations, language switching, and localization.
 * 
 * @module @jay-js/system/i18n
 */

/**
 * React hook for accessing internationalized strings with type safety
 * @see ./hooks/use-i18n.js for detailed documentation
 */
export { useI18n } from "./hooks/use-i18n.js";

/**
 * Configures the internationalization system with provided options
 * @see ./core/configuration.js for detailed documentation
 */
export { i18nDefineOptions } from "./core/configuration.js";

/**
 * Functions for managing the active language
 * @see ./core/language-manager.js for detailed documentation
 */
export { setLanguage, initLanguage } from "./core/language-manager.js";

/**
 * Type definitions for the internationalization system
 * @see ./types.js for detailed type information
 */
export * from "./types.js";
