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
	localStorageKey: "jayjs-current-theme",
	useAsDataset: true,
	useAsClass: false,
};

/**
 * Ensures that a default theme exists in the themes array.
 * Creates or updates the themes array to include a theme with id "default".
 *
 * @param {Partial<TThemeOptions>} options - The configuration options
 * @returns {Partial<TThemeOptions>} The processed options with ensured default theme
 */
function ensureDefaultTheme(options: Partial<TThemeOptions>): Partial<TThemeOptions> {
	const processedOptions = { ...options };

	// Get default theme values (use provided or fallback to defaults)
	const defaultLight = options.defaultTheme || themeOptions.defaultTheme || "light";
	const defaultDark = options.defaultDarkTheme || themeOptions.defaultDarkTheme || "dark";

	// Case 1: No themes array provided - create one with default theme
	if (!processedOptions.themes) {
		processedOptions.themes = [
			{
				id: "default",
				light: defaultLight,
				dark: defaultDark,
			},
		];
		return processedOptions;
	}

	// Case 2: Themes array exists - check if default theme is present
	const hasDefaultTheme = processedOptions.themes.some((theme) => theme.id === "default");

	if (!hasDefaultTheme) {
		// Case 3: Add default theme to existing themes array
		processedOptions.themes = [
			{
				id: "default",
				light: defaultLight,
				dark: defaultDark,
			},
			...processedOptions.themes,
		];
	}

	// Case 4: Default theme already exists - no changes needed
	return processedOptions;
}

/**
 * Configures the theme system with custom options and initializes the theme.
 *
 * This function processes the configuration to ensure a default theme exists,
 * then applies the theme based on the new configuration. The defaultTheme and
 * defaultDarkTheme properties are used to create a default theme definition
 * if one doesn't exist.
 *
 * @param {Partial<TThemeOptions>} options - Custom theme options to merge with defaults
 *
 * @example
 * // Legacy configuration - automatically creates default theme
 * themeDefineOptions({
 *   defaultTheme: "light",
 *   defaultDarkTheme: "dark",
 * });
 * // Results in: themes: [{ id: "default", light: "light", dark: "dark" }]
 *
 * @example
 * // Modern configuration with theme definitions
 * themeDefineOptions({
 *   themes: [
 *     { id: "orange", light: "orange-light", dark: "orange-dark" },
 *     { id: "red", light: "volcano", dark: "cave" },
 *     {
 *       id: "blue",
 *       light: "skytheme",
 *       dark: "alaska",
 *       lightStyle: { "text-decoration": "underline" },
 *       darkStyle: { "font-size": "16px" }
 *     }
 *   ]
 * });
 * // Automatically adds: { id: "default", light: "light", dark: "dark" }
 *
 * @example
 * // Mixed configuration - preserves existing default
 * themeDefineOptions({
 *   defaultTheme: "custom-light",
 *   defaultDarkTheme: "custom-dark",
 *   themes: [
 *     { id: "default", light: "light", dark: "dark" },
 *     { id: "red", light: "volcano", dark: "cave" }
 *   ]
 * });
 * // No changes - default theme already exists
 */
export function themeDefineOptions(options: Partial<TThemeOptions>): void {
	// Process options to ensure default theme exists
	const processedOptions = ensureDefaultTheme(options);

	// Apply the processed configuration
	Object.assign(themeOptions, processedOptions);
	initTheme();
}
