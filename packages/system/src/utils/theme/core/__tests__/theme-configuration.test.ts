import { vi } from 'vitest';
import type { TThemeDefinition } from "../../types";
import { themeDefineOptions, themeOptions } from "../configuration";

// Mock localStorage for testing
const localStorageMock = (() => {
	let store: Record<string, string> = {};
	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value;
		},
		clear: () => {
			store = {};
		},
		removeItem: (key: string) => {
			delete store[key];
		},
	};
})();

// Mock HTML element for theme application
class MockHTMLElement {
	dataset: Record<string, string> = {};
	_classes: string[] = [];
	style: CSSStyleDeclaration = {} as CSSStyleDeclaration;
	_customStyles: Record<string, string> = {};

	classList = {
		add: vi.fn().mockImplementation((className: string) => {
			if (!this._classes.includes(className)) {
				this._classes.push(className);
			}
		}),
		remove: vi.fn().mockImplementation((...classNames: string[]) => {
			this._classes = this._classes.filter((className) => !classNames.includes(className));
		}),
		contains: vi.fn().mockImplementation((className: string) => {
			return this._classes.includes(className);
		}),
		_classes: this._classes,
	};

	constructor() {
		this.dataset = {};
		this._classes = [];
		this._customStyles = {};

		// Mock style object
		this.style = {
			setProperty: vi.fn().mockImplementation((property: string, value: string) => {
				this._customStyles[property] = value;
			}),
			removeProperty: vi.fn().mockImplementation((property: string) => {
				delete this._customStyles[property];
			}),
		} as any;
	}
}

// Mock document
const documentMock = {
	documentElement: new MockHTMLElement(),
	addEventListener: vi.fn(),
	removeEventListener: vi.fn(),
	dispatchEvent: vi.fn(),
};

// Setup global mocks
Object.defineProperty(global, "localStorage", { value: localStorageMock });
Object.defineProperty(global, "document", { value: documentMock });

// Reset mocks and state before each test
beforeEach(() => {
	vi.clearAllMocks();
	localStorageMock.clear();
	documentMock.documentElement = new MockHTMLElement();
	documentMock.dispatchEvent = vi.fn();

	// Reset themeOptions to defaults
	Object.assign(themeOptions, {
		target: documentMock.documentElement as unknown as HTMLElement,
		saveToLocalStorage: true,
		defaultTheme: "light",
		defaultDarkTheme: "dark",
		localStorageKey: "jayjs-current-theme",
		useAsDataset: true,
		useAsClass: false,
		themes: undefined,
	});
});

describe("Theme Configuration Auto-Transform", () => {
	describe("Case 1: Legacy configuration (only defaults)", () => {
		it("should transform defaultTheme and defaultDarkTheme to themes array", () => {
			themeDefineOptions({
				defaultTheme: "light",
				defaultDarkTheme: "dark",
			});

			expect(themeOptions.themes).toEqual([
				{
					id: "default",
					light: "light",
					dark: "dark",
				},
			]);
		});

		it("should work with custom default theme names", () => {
			themeDefineOptions({
				defaultTheme: "custom-light",
				defaultDarkTheme: "custom-dark",
			});

			expect(themeOptions.themes).toEqual([
				{
					id: "default",
					light: "custom-light",
					dark: "custom-dark",
				},
			]);
		});

		it("should use fallback defaults when not provided", () => {
			themeDefineOptions({});

			expect(themeOptions.themes).toEqual([
				{
					id: "default",
					light: "light",
					dark: "dark",
				},
			]);
		});
	});

	describe("Case 2: Complete configuration (has themes with default)", () => {
		it("should not modify existing themes when default exists", () => {
			const originalThemes: TThemeDefinition[] = [
				{
					id: "default",
					light: "light",
					dark: "dark",
				},
				{
					id: "red",
					light: "volcano",
					dark: "cave",
				},
			];

			themeDefineOptions({
				defaultTheme: "light",
				defaultDarkTheme: "dark",
				themes: originalThemes,
			});

			expect(themeOptions.themes).toEqual(originalThemes);
		});

		it("should preserve custom styles in existing default theme", () => {
			const themesWithStyles: TThemeDefinition[] = [
				{
					id: "default",
					light: "light",
					dark: "dark",
					lightStyle: { color: "blue" },
					darkStyle: { color: "red" },
				},
			];

			themeDefineOptions({
				themes: themesWithStyles,
			});

			expect(themeOptions.themes).toEqual(themesWithStyles);
		});
	});

	describe("Case 3: Themes only configuration", () => {
		it("should not modify when themes array has default", () => {
			const originalThemes: TThemeDefinition[] = [
				{
					id: "default",
					light: "custom-light",
					dark: "custom-dark",
				},
			];

			themeDefineOptions({
				themes: originalThemes,
			});

			expect(themeOptions.themes).toEqual(originalThemes);
		});
	});

	describe("Case 4: Themes without default", () => {
		it("should add default theme to existing themes array", () => {
			const existingThemes: TThemeDefinition[] = [
				{
					id: "red",
					light: "volcano",
					dark: "cave",
				},
			];

			themeDefineOptions({
				themes: existingThemes,
			});

			expect(themeOptions.themes).toEqual([
				{
					id: "default",
					light: "light", // fallback default
					dark: "dark", // fallback default
				},
				...existingThemes,
			]);
		});

		it("should use provided defaults when adding default theme", () => {
			const existingThemes: TThemeDefinition[] = [
				{
					id: "red",
					light: "volcano",
					dark: "cave",
				},
			];

			themeDefineOptions({
				defaultTheme: "custom-light",
				defaultDarkTheme: "custom-dark",
				themes: existingThemes,
			});

			expect(themeOptions.themes).toEqual([
				{
					id: "default",
					light: "custom-light",
					dark: "custom-dark",
				},
				...existingThemes,
			]);
		});

		it("should maintain original order and add default at beginning", () => {
			const existingThemes: TThemeDefinition[] = [
				{
					id: "red",
					light: "volcano",
					dark: "cave",
				},
				{
					id: "blue",
					light: "sky",
					dark: "ocean",
				},
			];

			themeDefineOptions({
				themes: existingThemes,
			});

			expect(themeOptions.themes?.[0]).toEqual({
				id: "default",
				light: "light",
				dark: "dark",
			});
			expect(themeOptions.themes?.[1]).toEqual(existingThemes[0]);
			expect(themeOptions.themes?.[2]).toEqual(existingThemes[1]);
		});
	});

	describe("Edge cases", () => {
		it("should handle empty themes array", () => {
			themeDefineOptions({
				themes: [],
			});

			expect(themeOptions.themes).toEqual([
				{
					id: "default",
					light: "light",
					dark: "dark",
				},
			]);
		});

		it("should handle partial default theme values", () => {
			themeDefineOptions({
				defaultTheme: "only-light",
				// defaultDarkTheme not provided
			});

			expect(themeOptions.themes).toEqual([
				{
					id: "default",
					light: "only-light",
					dark: "dark", // fallback
				},
			]);
		});

		it("should handle undefined default theme values", () => {
			themeDefineOptions({
				defaultTheme: undefined,
				defaultDarkTheme: undefined,
			});

			expect(themeOptions.themes).toEqual([
				{
					id: "default",
					light: "light", // fallback
					dark: "dark", // fallback
				},
			]);
		});
	});

	describe("Backward compatibility", () => {
		it("should still accept legacy configuration and work correctly", () => {
			// Old style configuration
			themeDefineOptions({
				defaultTheme: "my-light",
				defaultDarkTheme: "my-dark",
				saveToLocalStorage: false,
				useAsDataset: false,
				useAsClass: true,
			});

			// Should have themes array created
			expect(themeOptions.themes).toBeDefined();
			expect(themeOptions.themes?.[0]).toEqual({
				id: "default",
				light: "my-light",
				dark: "my-dark",
			});

			// Other options should still work
			expect(themeOptions.saveToLocalStorage).toBe(false);
			expect(themeOptions.useAsDataset).toBe(false);
			expect(themeOptions.useAsClass).toBe(true);
		});
	});
});
