/**
 * @file Theme Types
 * @description Type definitions for the theme management system.
 */

/**
 * Configuration options for the theme system.
 * 
 * @typedef {Object} TThemeOptions
 * @property {HTMLElement} target - The HTML element to apply the theme to (usually document.documentElement)
 * @property {boolean} saveToLocalStorage - Whether to save theme preferences to localStorage
 * @property {string} defaultTheme - The default theme to use when no preference is saved
 * @property {string} defaultDarkTheme - The default dark theme to use when system prefers dark mode
 * @property {string} localStorageKey - The key to use for saving theme preference in localStorage
 * @property {boolean} [useAsDataset=true] - Whether to apply the theme as a data-theme attribute
 * @property {boolean} [useAsClass=false] - Whether to apply the theme as a CSS class
 * @property {Array<string>} [themeList] - List of available themes for class removal when switching
 */
export type TThemeOptions = {
  target: HTMLElement;
  saveToLocalStorage: boolean;
  defaultTheme: string;
  defaultDarkTheme: string;
  localStorageKey: string;
  useAsDataset?: boolean;
  useAsClass?: boolean;
  themeList?: Array<string>;
}