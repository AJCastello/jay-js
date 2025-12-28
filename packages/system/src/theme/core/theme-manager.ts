import type { TThemeMode, TThemeModeResult } from "../types";
import { themeOptions } from "./configuration";

/**
 * Validates if a theme exists in the current configuration.
 *
 * @param {string} themeName - The theme name to validate
 * @returns {boolean} True if the theme exists in the configuration, false otherwise
 */
function isValidTheme(themeName: string): boolean {
	if (themeOptions.themes) {
		const themeById = findThemeById(themeName);
		if (themeById) {
			return true;
		}

		const isVariant = themeOptions.themes.some((theme) => theme.light === themeName || theme.dark === themeName);
		if (isVariant) {
			return true;
		}
	}

	if (themeName === themeOptions.defaultTheme || themeName === themeOptions.defaultDarkTheme) {
		return true;
	}

	return false;
}

/**
 * Initializes the theme system based on stored preferences or system settings.
 *
 * @example
 * initTheme();
 */
export function initTheme() {
	const storedTheme = localStorage.getItem(themeOptions.localStorageKey);

	if (storedTheme && isValidTheme(storedTheme)) {
		setTheme(storedTheme);
	} else {
		if (storedTheme && !isValidTheme(storedTheme)) {
			console.warn(
				`Stored theme "${storedTheme}" is not valid in current configuration. Falling back to default theme.`,
			);
		}

		const defaultTheme = findThemeById("default");
		if (defaultTheme) {
			const prefersDark = prefersColorSchemeDark();
			setTheme("default", prefersDark ? "dark" : "light");
		} else {
			const themeToSet = prefersColorSchemeDark() ? themeOptions.defaultDarkTheme : themeOptions.defaultTheme;
			setTheme(themeToSet);
		}
	}
}

/**
 * Finds a theme definition by its ID from the themes array.
 *
 * @param {string} themeId - The ID of the theme to find
 * @returns {TThemeDefinition | undefined} The theme definition or undefined if not found
 */
function findThemeById(themeId: string) {
	return themeOptions.themes?.find((theme) => theme.id === themeId);
}

/**
 * Gets the current theme mode from the target element's dataset.
 *
 * @returns {TThemeMode} The current theme mode (light or dark), defaults to 'light'
 */
function getCurrentThemeMode(): TThemeMode {
	const mode = themeOptions.target.dataset.themeMode;
	return mode === "dark" || mode === "light" ? mode : "light";
}

/**
 * Gets the current theme and mode information.
 *
 * @returns {TThemeModeResult} Object containing the current theme name and mode
 *
 * @example
 * const current = getCurrentTheme();
 *
 * @example
 * const { theme, mode } = getCurrentTheme();
 */
export function getCurrentTheme(): TThemeModeResult {
	let theme = themeOptions.target.dataset.theme;

	if (!theme) {
		const defaultTheme = findThemeById("default");
		if (defaultTheme) {
			theme = defaultTheme.light;
		} else {
			theme = themeOptions.defaultTheme;
		}
	}

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
 * Finds a theme definition by checking if the given theme name matches any theme ID,
 * light variant, or dark variant in the themes array.
 *
 * @param {string} themeName - The theme name to find (could be ID, light variant, or dark variant)
 * @returns {object | undefined} Object with themeDefinition and mode, or undefined if not found
 */
function findThemeByName(themeName: string) {
	if (!themeOptions.themes) return undefined;

	for (const theme of themeOptions.themes) {
		if (theme.id === themeName) {
			return { themeDefinition: theme, mode: getCurrentThemeMode() };
		}

		if (theme.light === themeName) {
			return { themeDefinition: theme, mode: "light" as TThemeMode };
		}

		if (theme.dark === themeName) {
			return { themeDefinition: theme, mode: "dark" as TThemeMode };
		}
	}

	return undefined;
}

/**
 * Sets the current theme of the application.
 *
 * @param {string} theme - The theme name or ID to set
 * @param {TThemeMode} [mode] - Optional mode to set (light or dark)
 *
 * @example
 * setTheme('red');
 *
 * @example
 * setTheme('my-unlisted-theme', 'dark');
 *
 * @example
 * setTheme('custom-theme');
 */
export function setTheme(theme: string, mode?: TThemeMode) {
	let finalTheme = theme;
	let finalMode = mode || getCurrentThemeMode();

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

	if (themeOptions.themes) {
		const themeDefinition = findThemeById(theme);
		if (themeDefinition) {
			finalTheme = finalMode === "dark" ? themeDefinition.dark : themeDefinition.light;

			const stylesToApply = finalMode === "dark" ? themeDefinition.darkStyle : themeDefinition.lightStyle;
			if (stylesToApply) {
				applyStyles(stylesToApply);
			}
		} else {
			const themeInfo = findThemeByName(theme);
			if (themeInfo) {
				finalTheme = theme;
				finalMode = mode || themeInfo.mode;

				const stylesToApply =
					finalMode === "dark" ? themeInfo.themeDefinition.darkStyle : themeInfo.themeDefinition.lightStyle;
				if (stylesToApply) {
					applyStyles(stylesToApply);
				}
			}
		}
	}

	if (themeOptions.useAsDataset) {
		themeOptions.target.dataset.theme = finalTheme;
		themeOptions.target.dataset.themeMode = finalMode;
	}

	if (themeOptions.useAsClass) {
		if (themeOptions.themes) {
			const allThemeNames = themeOptions.themes.flatMap((t) => [t.light, t.dark]);
			themeOptions.target.classList.remove(...allThemeNames);
		} else {
			themeOptions.target.classList.remove(themeOptions.defaultTheme, themeOptions.defaultDarkTheme);
		}
		themeOptions.target.classList.add(finalTheme);
	}

	if (themeOptions.saveToLocalStorage) {
		try {
			localStorage.setItem(themeOptions.localStorageKey, finalTheme);
		} catch (e) {
			console.warn("Failed to save theme to localStorage:", e);
		}
	}
}

/**
 * Toggles between light and dark theme modes for the current theme.
 *
 * @returns {TThemeModeResult} Object containing the new theme name and mode
 *
 * @example
 * const result = toggleThemeMode();
 *
 * @example
 * const result = toggleThemeMode();
 */
export function toggleThemeMode(): TThemeModeResult {
	const currentMode = getCurrentThemeMode();
	const newMode: TThemeMode = currentMode === "light" ? "dark" : "light";

	let themeToSet: string;

	if (themeOptions.themes) {
		const currentTheme = themeOptions.target.dataset.theme;

		const currentThemeDefinition = themeOptions.themes.find((t) => t.light === currentTheme || t.dark === currentTheme);

		if (currentThemeDefinition) {
			themeToSet = currentThemeDefinition.id;
		} else {
			const defaultTheme = findThemeById("default");
			if (defaultTheme) {
				themeToSet = "default";
			} else {
				themeToSet = newMode === "dark" ? themeOptions.defaultDarkTheme : themeOptions.defaultTheme;
			}
		}
	} else {
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
 * if (prefersColorSchemeDark()) {
 *   console.log('Dark mode is enabled');
 * }
 */
export function prefersColorSchemeDark(): boolean {
	return window.matchMedia?.("(prefers-color-scheme: dark)").matches;
}
