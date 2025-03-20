/**
 * @file Theme Configuration
 * @description Configuration options and setup for the theme management system.
 */

import type { TThemeOptions } from "../types.js";
import { initTheme } from "./theme-manager.js";

/**
 * Default theme configuration options.
 *
 * @type {TThemeOptions}
 */
export const themeOptions: TThemeOptions = {
	target: document.documentElement,
	saveToLocalStorage: true,
	defaultTheme: "light",
	defaultDarkTheme: "dark",
	localStorageKey: "jayjs-churrent-theme",
	useAsDataset: true,
	useAsClass: false,
	themeList: ["light", "dark"],
};

/**
 * Configures the theme system with custom options and initializes the theme.
 *
 * This function allows overriding default theme options and automatically calls
 * initTheme() to apply the theme based on the new configuration.
 *
 * @param {Partial<TThemeOptions>} options - Custom theme options to merge with defaults
 *
 * @example
 * // Configure theme with custom options
 * themeDefineOptions({
 *   defaultTheme: 'light-blue',
 *   defaultDarkTheme: 'dark-blue',
 *   themeList: ['light-blue', 'dark-blue', 'high-contrast']
 * });
 *
 * @example
 * // Configure theme to use classes instead of dataset attributes
 * themeDefineOptions({
 *   useAsDataset: false,
 *   useAsClass: true,
 * });
 */
export function themeDefineOptions(options: Partial<TThemeOptions>): void {
	Object.assign(themeOptions, options);
	initTheme();
}
