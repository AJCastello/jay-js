import { themeDefineOptions, themeOptions } from "../configuration";
import { initTheme, prefersColorSchemeDark, setTheme } from "../theme-manager";
import * as themeManagerModule from "../theme-manager";

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
	classList = {
		add: jest.fn().mockImplementation((className: string) => {
			if (!this._classes.includes(className)) {
				this._classes.push(className);
			}
		}),
		remove: jest.fn().mockImplementation((...classNames: string[]) => {
			this._classes = this._classes.filter((className) => !classNames.includes(className));
		}),
		contains: jest.fn().mockImplementation((className: string) => {
			return this._classes.includes(className);
		}),
		_classes: this._classes,
	};

	constructor() {
		this.dataset = {};
		this._classes = [];
	}
}

// Mock document and window objects
const documentMock = {
	documentElement: new MockHTMLElement(),
	addEventListener: jest.fn(),
	removeEventListener: jest.fn(),
	dispatchEvent: jest.fn(),
};

interface WindowMock {
	matchMedia: jest.Mock;
	_prefersColorSchemeDark: boolean;
}

const windowMock: WindowMock = {
	matchMedia: jest.fn().mockImplementation((query: string) => {
		return {
			matches: query === "(prefers-color-scheme: dark)" && windowMock._prefersColorSchemeDark,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		};
	}),
	_prefersColorSchemeDark: false,
};

// Setup global mocks
Object.defineProperty(global, "localStorage", { value: localStorageMock });
Object.defineProperty(global, "document", { value: documentMock });
Object.defineProperty(global, "window", { value: windowMock });

// Reset mocks and state before each test
beforeEach(() => {
	jest.clearAllMocks();
	localStorageMock.clear();
	documentMock.documentElement = new MockHTMLElement();
	documentMock.dispatchEvent = jest.fn();
	windowMock._prefersColorSchemeDark = false;

	// Reset theme configuration to default values
	Object.assign(themeOptions, {
		target: documentMock.documentElement as unknown as HTMLElement,
		saveToLocalStorage: true,
		defaultTheme: "light",
		defaultDarkTheme: "dark",
		localStorageKey: "jayjs-current-theme",
		useAsDataset: true,
		useAsClass: false,
		themes: undefined, // Clear any existing themes
	});
});

describe("Theme Manager", () => {
	describe("themeDefineOptions", () => {
		it("should set custom options", () => {
			// First set the standard options
			themeDefineOptions({
				target: documentMock.documentElement as unknown as HTMLElement,
				saveToLocalStorage: true,
				defaultTheme: "light",
				defaultDarkTheme: "dark",
				localStorageKey: "jayjs-current-theme",
				useAsDataset: true,
				useAsClass: false,
			});

			const customOptions = {
				defaultTheme: "custom-light",
				defaultDarkTheme: "custom-dark",
			};

			themeDefineOptions(customOptions);

			expect(themeOptions.defaultTheme).toBe("custom-light");
			expect(themeOptions.defaultDarkTheme).toBe("custom-dark");
		});

		it("should merge options with defaults", () => {
			// First set the standard options
			themeDefineOptions({
				target: documentMock.documentElement as unknown as HTMLElement,
				saveToLocalStorage: true,
				defaultTheme: "light",
				defaultDarkTheme: "dark",
				localStorageKey: "jayjs-current-theme",
				useAsDataset: true,
				useAsClass: false,
			});

			const partialOptions = {
				defaultTheme: "new-light",
			};

			themeDefineOptions(partialOptions);

			expect(themeOptions.defaultTheme).toBe("new-light");
			expect(themeOptions.defaultDarkTheme).toBe("dark"); // unchanged
			expect(themeOptions.saveToLocalStorage).toBe(true); // unchanged
		});

		it("should call initTheme after setting options", () => {
			// First set the standard options (without calling this test)
			Object.assign(themeOptions, {
				target: documentMock.documentElement as unknown as HTMLElement,
				saveToLocalStorage: true,
				defaultTheme: "light",
				defaultDarkTheme: "dark",
				localStorageKey: "jayjs-current-theme",
				useAsDataset: true,
				useAsClass: false,
			});

			// Mock initTheme since it's called by themeDefineOptions
			const initThemeSpy = jest.spyOn(themeManagerModule, "initTheme");

			themeDefineOptions({
				defaultTheme: "custom-blue",
			});

			expect(initThemeSpy).toHaveBeenCalled();

			initThemeSpy.mockRestore();
		});
	});

	describe("initTheme", () => {
		beforeEach(() => {
			// Setup base theme options for tests
			Object.assign(themeOptions, {
				target: documentMock.documentElement as unknown as HTMLElement,
				saveToLocalStorage: true,
				defaultTheme: "light",
				defaultDarkTheme: "dark",
				localStorageKey: "jayjs-current-theme",
				useAsDataset: true,
				useAsClass: false,
			});
		});

		it("should set default theme when no preference exists", () => {
			initTheme();

			// Should use default theme in light mode
			expect(documentMock.documentElement.dataset.theme).toBe("light");
			expect(documentMock.documentElement.dataset.themeMode).toBe("light");
		});

		it("should use stored theme from localStorage if available", () => {
			localStorage.setItem("jayjs-current-theme", "dark");

			initTheme();

			expect(documentMock.documentElement.dataset.theme).toBe("dark");
		});

		it("should use default dark theme when system prefers dark mode", () => {
			windowMock._prefersColorSchemeDark = true;

			initTheme();

			expect(documentMock.documentElement.dataset.theme).toBe("dark");
		});

		it("should prioritize localStorage over system preference", () => {
			windowMock._prefersColorSchemeDark = true;
			localStorage.setItem("jayjs-current-theme", "light");

			initTheme();

			expect(documentMock.documentElement.dataset.theme).toBe("light");
		});
	});

	describe("setTheme", () => {
		beforeEach(() => {
			// Setup base theme options for tests
			Object.assign(themeOptions, {
				target: documentMock.documentElement as unknown as HTMLElement,
				saveToLocalStorage: true,
				defaultTheme: "light",
				defaultDarkTheme: "dark",
				localStorageKey: "jayjs-current-theme",
				useAsDataset: true,
				useAsClass: false,
			});
		});

		it("should set theme as dataset attribute when useAsDataset is true", () => {
			Object.assign(themeOptions, {
				useAsDataset: true,
				useAsClass: false,
			});

			setTheme("dark");

			expect(documentMock.documentElement.dataset.theme).toBe("dark");
		});

		it("should set theme as class when useAsClass is true", () => {
			Object.assign(themeOptions, {
				useAsDataset: false,
				useAsClass: true,
			});

			setTheme("dark");

			expect(documentMock.documentElement.classList.add).toHaveBeenCalledWith("dark");
			expect(documentMock.documentElement._classes).toContain("dark");
		});

		it("should remove old theme classes when switching themes with useAsClass", () => {
			Object.assign(themeOptions, {
				useAsDataset: false,
				useAsClass: true,
			});

			// Add an existing theme class
			documentMock.documentElement.classList.add("light");

			setTheme("dark");

			// Should remove all theme classes (including from default theme)
			expect(documentMock.documentElement.classList.remove).toHaveBeenCalledWith("light", "dark");
			expect(documentMock.documentElement.classList.add).toHaveBeenCalledWith("dark");
			expect(documentMock.documentElement._classes).toContain("dark");
			expect(documentMock.documentElement._classes).not.toContain("light");
		});

		it("should save theme to localStorage when saveToLocalStorage is true", () => {
			Object.assign(themeOptions, {
				saveToLocalStorage: true,
			});

			setTheme("dark");

			expect(localStorage.getItem("jayjs-current-theme")).toBe("dark");
		});

		it("should not save theme to localStorage when saveToLocalStorage is false", () => {
			Object.assign(themeOptions, {
				saveToLocalStorage: false,
			});

			// Clear localStorage first to ensure clean state
			localStorage.removeItem("jayjs-current-theme");

			setTheme("dark");

			expect(localStorage.getItem("jayjs-current-theme")).toBeNull();
		});

		it("should dispatch themeChanged event", () => {
			setTheme("dark");

			expect(documentMock.dispatchEvent).toHaveBeenCalled();
			const eventArg = documentMock.dispatchEvent.mock.calls[0][0];
			expect(eventArg.type).toBe("themeChanged");
			expect(eventArg.detail.theme).toBe("dark");
		});

		it("should handle localStorage errors gracefully", () => {
			const originalSetItem = localStorage.setItem;
			localStorage.setItem = jest.fn().mockImplementation(() => {
				throw new Error("Storage error");
			});

			const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => { });

			setTheme("dark");

			expect(consoleSpy).toHaveBeenCalledWith(
				expect.stringContaining("Failed to save theme to localStorage"),
				expect.any(Error),
			);

			// Restore original
			localStorage.setItem = originalSetItem;
			consoleSpy.mockRestore();
		});
	});

	describe("prefersColorSchemeDark", () => {
		it("should return true when system prefers dark mode", () => {
			windowMock._prefersColorSchemeDark = true;

			expect(prefersColorSchemeDark()).toBe(true);
		});

		it("should return false when system prefers light mode", () => {
			windowMock._prefersColorSchemeDark = false;

			expect(prefersColorSchemeDark()).toBe(false);
		});
	});

	describe("combined functionality", () => {
		it("should handle complete theme workflow", () => {
			// Setup base theme options for tests
			Object.assign(themeOptions, {
				target: documentMock.documentElement as unknown as HTMLElement,
				saveToLocalStorage: true,
				defaultTheme: "light",
				defaultDarkTheme: "dark",
				localStorageKey: "jayjs-current-theme",
				useAsDataset: true,
				useAsClass: true,
			});

			// Initialize theme system
			initTheme();

			// Initial theme should be light (from default theme)
			expect(documentMock.documentElement.dataset.theme).toBe("light");
			expect(documentMock.documentElement.dataset.themeMode).toBe("light");
			expect(documentMock.documentElement._classes).toContain("light");

			// Change to dark theme
			setTheme("dark");

			// Should update both dataset and class
			expect(documentMock.documentElement.dataset.theme).toBe("dark");
			expect(documentMock.documentElement._classes).toContain("dark");
			expect(documentMock.documentElement._classes).not.toContain("light");

			// Should save to localStorage
			expect(localStorage.getItem("jayjs-current-theme")).toBe("dark");

			// Should dispatch event
			expect(documentMock.dispatchEvent).toHaveBeenCalled();

			// Reinitialize from localStorage
			initTheme();

			// Should still be dark theme
			expect(documentMock.documentElement.dataset.theme).toBe("dark");
		});
	});
});
