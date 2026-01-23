/**
 * @file Theme Types
 * @description Type definitions for the theme management system.
 */

/**
 * Theme definition for the themes array.
 *
 * @typedef {Object} TThemeDefinition
 * @property {string} id - Unique identifier for the theme
 * @property {string} light - Light theme variant name
 * @property {string} dark - Dark theme variant name
 * @property {Record<string, string>} [lightStyle] - Optional CSS styles to apply in light mode
 * @property {Record<string, string>} [darkStyle] - Optional CSS styles to apply in dark mode
 */
export type TThemeDefinition = {
	id: string;
	light: string;
	dark: string;
	lightStyle?: Record<string, string>;
	darkStyle?: Record<string, string>;
};

/**
 * Theme mode type definition.
 */
export type TThemeMode = "light" | "dark";

/**
 * Result type for toggleThemeMode function.
 *
 * @typedef {Object} TThemeModeResult
 * @property {string} theme - The current theme name
 * @property {TThemeMode} mode - The current theme mode
 */
export type TThemeModeResult = {
	theme: string;
	mode: TThemeMode;
};

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
 * @property {Array<TThemeDefinition>} [themes] - Array of available theme definitions
 */
export type TThemeOptions = {
	target: HTMLElement;
	saveToLocalStorage: boolean;
	defaultTheme: string;
	defaultDarkTheme: string;
	localStorageKey: string;
	useAsDataset?: boolean;
	useAsClass?: boolean;
	themes?: Array<TThemeDefinition>;
};
