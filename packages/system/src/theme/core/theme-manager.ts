/**
 * @file Theme Manager
 * @description Provides functionality for theme management in web applications.
 *
 * The theme manager allows for:
 * - Automatic theme initialization based on user preferences
 * - Theme switching with both dataset and class-based approaches
 * - Local storage persistence of theme choices
 * - System dark mode preference detection
 */

import { themeOptions } from "./configuration";

/**
 * Initializes the theme system based on stored preferences or system settings.
 *
 * This function determines which theme to set by checking:
 * 1. localStorage for previously saved theme preference
 * 2. System dark mode preference (if no stored theme)
 * 3. Defaults to the configured default theme
 *
 * @example
 * // Basic usage - call this after configuring theme options
 * initTheme();
 */
export function initTheme() {
	let themeToSet = themeOptions.defaultTheme;
	const storedTheme = localStorage.getItem(themeOptions.localStorageKey);

	if (storedTheme) {
		themeToSet = storedTheme;
	} else if (prefersColorSchemeDark()) {
		themeToSet = themeOptions.defaultDarkTheme;
	}

	setTheme(themeToSet);
}

/**
 * Sets the current theme of the application.
 *
 * This function:
 * 1. Applies the theme as a dataset attribute if enabled
 * 2. Applies the theme as a class if enabled
 * 3. Saves the theme to localStorage if enabled
 * 4. Dispatches a 'themeChanged' event
 *
 * @param {string} theme - The theme name to set
 *
 * @example
 * // Switch to dark theme
 * setTheme('dark');
 *
 * @example
 * // Switch to a custom theme
 * setTheme('high-contrast');
 *
 * @fires themeChanged - Custom event with the new theme in the detail
 */
export function setTheme(theme: string) {
	if (themeOptions.useAsDataset) {
		themeOptions.target.dataset.theme = theme;
	}

	if (themeOptions.useAsClass) {
		themeOptions.target.classList.remove(
			...(themeOptions.themeList || [themeOptions.defaultTheme, themeOptions.defaultDarkTheme]),
		);
		themeOptions.target.classList.add(theme);
	}

	if (themeOptions.saveToLocalStorage) {
		try {
			localStorage.setItem(themeOptions.localStorageKey, theme);
		} catch (e) {
			console.warn("Failed to save theme to localStorage:", e);
		}
	}

	const themeChangedEvent = new CustomEvent("themeChanged", { detail: { theme } });
	document.dispatchEvent(themeChangedEvent);
}

/**
 * Checks if the user's system prefers a dark color scheme.
 *
 * @returns {boolean} True if the system prefers dark mode, false otherwise
 *
 * @example
 * // Check if system is in dark mode
 * if (prefersColorSchemeDark()) {
 *   console.log('Dark mode is enabled');
 * }
 */
export function prefersColorSchemeDark(): boolean {
	return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
