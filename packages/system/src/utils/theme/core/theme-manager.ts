/**
 * @file Theme Manager
 * @description Provides functionality for theme management in web applications.
 *
 * The theme manager allows for:
 * - Automatic theme initialization based on user preferences
 * - Theme switching with both dataset and class-based approaches
 * - Local storage persistence of theme choices
 * - System dark mode preference detection
 * - Advanced theme management with theme definitions and mode switching
 */

import { themeOptions } from "./configuration";
import type { TThemeMode, TThemeModeResult } from "../types";

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
 * Finds a theme definition by its ID from the themes array.
 *
 * @param {string} themeId - The ID of the theme to find
 * @returns {TThemeDefinition | undefined} The theme definition or undefined if not found
 */
function findThemeById(themeId: string) {
	return themeOptions.themes?.find(theme => theme.id === themeId);
}

/**
 * Gets the current theme mode from the target element's dataset.
 *
 * @returns {TThemeMode} The current theme mode (light or dark), defaults to 'light'
 */
function getCurrentThemeMode(): TThemeMode {
	const mode = themeOptions.target.dataset.themeMode;
	return (mode === "dark" || mode === "light") ? mode : "light";
}

/**
 * Gets the current theme and mode information.
 *
 * @returns {TThemeModeResult} Object containing the current theme name and mode
 *
 * @example
 * // Get current theme info
 * const current = getCurrentTheme();
 * // Returns: { theme: "orange-light", mode: "light" }
 *
 * @example
 * // Use the returned info
 * const { theme, mode } = getCurrentTheme();
 * console.log(`Current theme: ${theme}, Mode: ${mode}`);
 */
export function getCurrentTheme(): TThemeModeResult {
	const theme = themeOptions.target.dataset.theme || themeOptions.defaultTheme;
	const mode = getCurrentThemeMode();

	return { theme, mode };
}

/**
 * Applies CSS styles to the target element.
 *
 * @param {Record<string, string>} styles - Object containing CSS properties and values
 */
function applyStyles(styles: Record<string, string>) {
	for (const [property, value] of Object.entries(styles)) {
		themeOptions.target.style.setProperty(property, value);
	}
}

/**
 * Clears CSS styles that were previously applied by the theme system.
 *
 * @param {Record<string, string>} styles - Object containing CSS properties to clear
 */
function clearStyles(styles: Record<string, string>) {
	for (const property of Object.keys(styles)) {
		themeOptions.target.style.removeProperty(property);
	}
}

/**
 * Sets the current theme of the application.
 *
 * This function supports two modes of operation:
 * 1. With theme definitions: looks up theme by ID and applies appropriate variant based on current mode
 * 2. Without theme definitions: applies the theme name directly
 *
 * @param {string} theme - The theme name or ID to set
 * @param {TThemeMode} [mode] - Optional mode to set (light or dark)
 *
 * @example
 * // Using theme definitions - will apply "red-light" or "red-dark" based on current mode
 * setTheme('red');
 *
 * @example
 * // Direct theme application with mode
 * setTheme('my-unlisted-theme', 'dark');
 *
 * @example
 * // Direct theme application
 * setTheme('custom-theme');
 *
 * @fires themeChanged - Custom event with the new theme and mode in the detail
 */
export function setTheme(theme: string, mode?: TThemeMode) {
	let finalTheme = theme;
	let finalMode = mode || getCurrentThemeMode();

	// Clear any existing custom styles
	if (themeOptions.themes) {
		for (const themeDefinition of themeOptions.themes) {
			if (themeDefinition.lightStyle) {
				clearStyles(themeDefinition.lightStyle);
			}
			if (themeDefinition.darkStyle) {
				clearStyles(themeDefinition.darkStyle);
			}
		}
	}

	// Check if themes are defined and theme exists in the list
	if (themeOptions.themes) {
		const themeDefinition = findThemeById(theme);
		if (themeDefinition) {
			// Use theme definition
			finalTheme = finalMode === "dark" ? themeDefinition.dark : themeDefinition.light;

			// Apply custom styles if defined
			const stylesToApply = finalMode === "dark" ? themeDefinition.darkStyle : themeDefinition.lightStyle;
			if (stylesToApply) {
				applyStyles(stylesToApply);
			}
		}
		// If theme not found in definitions, use the theme name directly
	}

	// Apply theme and mode to dataset
	if (themeOptions.useAsDataset) {
		themeOptions.target.dataset.theme = finalTheme;
		themeOptions.target.dataset.themeMode = finalMode;
	}

	// Apply theme as class if enabled
	if (themeOptions.useAsClass) {
		// Remove all possible theme classes
		if (themeOptions.themes) {
			const allThemeNames = themeOptions.themes.flatMap(t => [t.light, t.dark]);
			themeOptions.target.classList.remove(...allThemeNames);
		} else {
			// Fallback: remove default themes
			themeOptions.target.classList.remove(themeOptions.defaultTheme, themeOptions.defaultDarkTheme);
		}
		themeOptions.target.classList.add(finalTheme);
	}

	// Save to localStorage if enabled
	if (themeOptions.saveToLocalStorage) {
		try {
			localStorage.setItem(themeOptions.localStorageKey, finalTheme);
		} catch (e) {
			console.warn("Failed to save theme to localStorage:", e);
		}
	}

	// Dispatch theme changed event
	const themeChangedEvent = new CustomEvent("themeChanged", {
		detail: { theme: finalTheme, mode: finalMode }
	});
	document.dispatchEvent(themeChangedEvent);
}

/**
 * Toggles between light and dark theme modes for the current theme.
 *
 * This function identifies the current theme and switches between its light and dark variants.
 * If theme definitions are available, it will use the appropriate variant.
 * If no theme definitions are available, it toggles between defaultTheme and defaultDarkTheme.
 *
 * @returns {TThemeModeResult} Object containing the new theme name and mode
 *
 * @example
 * // Current state: <body data-theme="orange-light" data-theme-mode="light">
 * const result = toggleThemeMode();
 * // New state: <body data-theme="orange-dark" data-theme-mode="dark">
 * // Returns: { theme: "orange-dark", mode: "dark" }
 *
 * @example
 * // Without theme definitions - toggles between defaults
 * const result = toggleThemeMode();
 * // Returns: { theme: "dark", mode: "dark" } or { theme: "light", mode: "light" }
 */
export function toggleThemeMode(): TThemeModeResult {
	const currentMode = getCurrentThemeMode();
	const newMode: TThemeMode = currentMode === "light" ? "dark" : "light";

	let themeToSet: string;

	if (themeOptions.themes) {
		// Find current theme by looking at the current theme value
		const currentTheme = themeOptions.target.dataset.theme || themeOptions.defaultTheme;

		// Try to find which theme definition this belongs to
		let currentThemeDefinition = themeOptions.themes.find(t =>
			t.light === currentTheme || t.dark === currentTheme
		);

		if (currentThemeDefinition) {
			// Use the theme ID to set the new mode
			themeToSet = currentThemeDefinition.id;
		} else {
			// Fallback to default themes
			themeToSet = newMode === "dark" ? themeOptions.defaultDarkTheme : themeOptions.defaultTheme;
		}
	} else {
		// No theme definitions - use defaults
		themeToSet = newMode === "dark" ? themeOptions.defaultDarkTheme : themeOptions.defaultTheme;
	}

	setTheme(themeToSet, newMode);

	const finalTheme = themeOptions.target.dataset.theme || themeToSet;
	return { theme: finalTheme, mode: newMode };
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
