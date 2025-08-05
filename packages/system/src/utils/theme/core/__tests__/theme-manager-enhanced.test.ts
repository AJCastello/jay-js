import { themeDefineOptions, themeOptions } from "../configuration";
import { initTheme, prefersColorSchemeDark, setTheme, toggleThemeMode, getCurrentTheme } from "../theme-manager";
import * as themeManagerModule from "../theme-manager";
import type { TThemeDefinition, TThemeMode } from "../../types";

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
    this._customStyles = {};

    // Mock style object
    this.style = {
      setProperty: jest.fn().mockImplementation((property: string, value: string) => {
        this._customStyles[property] = value;
      }),
      removeProperty: jest.fn().mockImplementation((property: string) => {
        delete this._customStyles[property];
      }),
    } as any;
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
});

describe("Enhanced Theme Manager", () => {
  describe("themeDefineOptions with themes", () => {
    it("should set theme definitions", () => {
      const themes: TThemeDefinition[] = [
        { id: "orange", light: "orange-light", dark: "orange-dark" },
        { id: "red", light: "volcano", dark: "cave" },
      ];

      themeDefineOptions({
        target: documentMock.documentElement as unknown as HTMLElement,
        themes,
      });

      // Should have added default theme at the beginning
      expect(themeOptions.themes).toEqual([
        { id: "default", light: "light", dark: "dark" },
        ...themes
      ]);
    }); it("should handle themes with custom styles", () => {
      const themes: TThemeDefinition[] = [
        {
          id: "blue",
          light: "skytheme",
          dark: "alaska",
          lightStyle: { "text-decoration": "underline" },
          darkStyle: { "font-size": "16px" },
        },
      ];

      themeDefineOptions({
        target: documentMock.documentElement as unknown as HTMLElement,
        themes,
      });

      // Should have added default theme at the beginning
      expect(themeOptions.themes).toEqual([
        { id: "default", light: "light", dark: "dark" },
        ...themes
      ]);
    });
  });

  describe("setTheme with theme definitions", () => {
    beforeEach(() => {
      const themes: TThemeDefinition[] = [
        { id: "orange", light: "orange-light", dark: "orange-dark" },
        { id: "red", light: "volcano", dark: "cave" },
        {
          id: "blue",
          light: "skytheme",
          dark: "alaska",
          lightStyle: { "text-decoration": "underline" },
          darkStyle: { "font-size": "16px" },
        },
      ];

      Object.assign(themeOptions, {
        target: documentMock.documentElement as unknown as HTMLElement,
        saveToLocalStorage: true,
        defaultTheme: "light",
        defaultDarkTheme: "dark",
        localStorageKey: "jayjs-current-theme",
        useAsDataset: true,
        useAsClass: false,
        themes,
      });
    });

    it("should apply theme by ID with light mode", () => {
      // Set initial mode to light
      documentMock.documentElement.dataset.themeMode = "light";

      setTheme("red");

      expect(documentMock.documentElement.dataset.theme).toBe("volcano");
      expect(documentMock.documentElement.dataset.themeMode).toBe("light");
    });

    it("should apply theme by ID with dark mode", () => {
      // Set initial mode to dark
      documentMock.documentElement.dataset.themeMode = "dark";

      setTheme("red");

      expect(documentMock.documentElement.dataset.theme).toBe("cave");
      expect(documentMock.documentElement.dataset.themeMode).toBe("dark");
    });

    it("should apply theme with explicit mode parameter", () => {
      setTheme("red", "dark");

      expect(documentMock.documentElement.dataset.theme).toBe("cave");
      expect(documentMock.documentElement.dataset.themeMode).toBe("dark");
    });

    it("should apply unlisted theme directly", () => {
      setTheme("my-unlisted-theme");

      expect(documentMock.documentElement.dataset.theme).toBe("my-unlisted-theme");
      expect(documentMock.documentElement.dataset.themeMode).toBe("light");
    });

    it("should apply unlisted theme with mode", () => {
      setTheme("my-unlisted-theme", "dark");

      expect(documentMock.documentElement.dataset.theme).toBe("my-unlisted-theme");
      expect(documentMock.documentElement.dataset.themeMode).toBe("dark");
    });

    it("should apply custom styles for light mode", () => {
      setTheme("blue", "light");

      expect(documentMock.documentElement.dataset.theme).toBe("skytheme");
      expect(documentMock.documentElement.style.setProperty).toHaveBeenCalledWith("text-decoration", "underline");
    });

    it("should apply custom styles for dark mode", () => {
      setTheme("blue", "dark");

      expect(documentMock.documentElement.dataset.theme).toBe("alaska");
      expect(documentMock.documentElement.style.setProperty).toHaveBeenCalledWith("font-size", "16px");
    });

    it("should clear previous custom styles when switching themes", () => {
      // First set blue theme with light mode
      setTheme("blue", "light");

      // Clear the mock to check new calls
      jest.clearAllMocks();

      // Switch to red theme
      setTheme("red", "light");

      // Should clear the previous custom style
      expect(documentMock.documentElement.style.removeProperty).toHaveBeenCalledWith("text-decoration");
    });

    it("should dispatch enhanced themeChanged event", () => {
      setTheme("red", "dark");

      expect(documentMock.dispatchEvent).toHaveBeenCalled();
      const eventArg = documentMock.dispatchEvent.mock.calls[0][0];
      expect(eventArg.type).toBe("themeChanged");
      expect(eventArg.detail.theme).toBe("cave");
      expect(eventArg.detail.mode).toBe("dark");
    });
  });

  describe("toggleThemeMode", () => {
    beforeEach(() => {
      const themes: TThemeDefinition[] = [
        { id: "orange", light: "orange-light", dark: "orange-dark" },
        { id: "red", light: "volcano", dark: "cave" },
      ];

      Object.assign(themeOptions, {
        target: documentMock.documentElement as unknown as HTMLElement,
        saveToLocalStorage: true,
        defaultTheme: "light",
        defaultDarkTheme: "dark",
        localStorageKey: "jayjs-current-theme",
        useAsDataset: true,
        useAsClass: false,
        themes,
      });
    });

    it("should toggle from light to dark mode with theme definitions", () => {
      // Set initial state
      documentMock.documentElement.dataset.theme = "orange-light";
      documentMock.documentElement.dataset.themeMode = "light";

      const result = toggleThemeMode();

      expect(documentMock.documentElement.dataset.theme).toBe("orange-dark");
      expect(documentMock.documentElement.dataset.themeMode).toBe("dark");
      expect(result).toEqual({ theme: "orange-dark", mode: "dark" });
    });

    it("should toggle from dark to light mode with theme definitions", () => {
      // Set initial state
      documentMock.documentElement.dataset.theme = "orange-dark";
      documentMock.documentElement.dataset.themeMode = "dark";

      const result = toggleThemeMode();

      expect(documentMock.documentElement.dataset.theme).toBe("orange-light");
      expect(documentMock.documentElement.dataset.themeMode).toBe("light");
      expect(result).toEqual({ theme: "orange-light", mode: "light" });
    });

    it("should handle unknown theme by using defaults", () => {
      // Set initial state with unknown theme
      documentMock.documentElement.dataset.theme = "unknown-theme";
      documentMock.documentElement.dataset.themeMode = "light";

      const result = toggleThemeMode();

      expect(documentMock.documentElement.dataset.theme).toBe("dark");
      expect(documentMock.documentElement.dataset.themeMode).toBe("dark");
      expect(result).toEqual({ theme: "dark", mode: "dark" });
    });

    it("should work without theme definitions", () => {
      // Remove theme definitions
      Object.assign(themeOptions, {
        themes: undefined,
      });

      // Set initial state
      documentMock.documentElement.dataset.theme = "light";
      documentMock.documentElement.dataset.themeMode = "light";

      const result = toggleThemeMode();

      expect(documentMock.documentElement.dataset.theme).toBe("dark");
      expect(documentMock.documentElement.dataset.themeMode).toBe("dark");
      expect(result).toEqual({ theme: "dark", mode: "dark" });
    });

    it("should default to light mode when themeMode is not set", () => {
      // No theme mode set
      documentMock.documentElement.dataset.theme = "orange-light";

      const result = toggleThemeMode();

      expect(documentMock.documentElement.dataset.themeMode).toBe("dark");
      expect(result.mode).toBe("dark");
    });
  });

  describe("initTheme with theme definitions", () => {
    beforeEach(() => {
      const themes: TThemeDefinition[] = [
        { id: "orange", light: "orange-light", dark: "orange-dark" },
      ];

      Object.assign(themeOptions, {
        target: documentMock.documentElement as unknown as HTMLElement,
        saveToLocalStorage: true,
        defaultTheme: "light",
        defaultDarkTheme: "dark",
        localStorageKey: "jayjs-current-theme",
        useAsDataset: true,
        useAsClass: false,
        themes,
      });
    });

    it("should initialize with theme mode dataset", () => {
      initTheme();

      expect(documentMock.documentElement.dataset.theme).toBe("light");
      expect(documentMock.documentElement.dataset.themeMode).toBe("light");
    });

    it("should restore theme from localStorage with mode", () => {
      localStorage.setItem("jayjs-current-theme", "orange-dark");

      initTheme();

      expect(documentMock.documentElement.dataset.theme).toBe("orange-dark");
      // Mode should be determined from theme name or default to light
      expect(documentMock.documentElement.dataset.themeMode).toBeDefined();
    });

    it("should validate stored theme exists in configuration", () => {
      // Store a valid theme
      localStorage.setItem("jayjs-current-theme", "orange-light");

      initTheme();

      expect(documentMock.documentElement.dataset.theme).toBe("orange-light");
    });

    it("should fallback to default when stored theme is invalid", () => {
      // Store an invalid theme
      localStorage.setItem("jayjs-current-theme", "nonexistent-theme");

      const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => { });

      initTheme();

      // Should fallback to default theme
      expect(documentMock.documentElement.dataset.theme).toBe("light");
      expect(documentMock.documentElement.dataset.themeMode).toBe("light");

      // Should log warning about invalid theme
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Stored theme "nonexistent-theme" is not valid in current configuration')
      );

      consoleSpy.mockRestore();
    });

    it("should fallback to default when stored theme ID is invalid", () => {
      // Store an invalid theme ID
      localStorage.setItem("jayjs-current-theme", "invalid-theme-id");

      const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => { });

      initTheme();

      // Should fallback to default theme
      expect(documentMock.documentElement.dataset.theme).toBe("light");
      expect(documentMock.documentElement.dataset.themeMode).toBe("light");

      // Should log warning
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Stored theme "invalid-theme-id" is not valid in current configuration')
      );

      consoleSpy.mockRestore();
    });

    it("should accept stored theme by ID", () => {
      // Store a valid theme ID
      localStorage.setItem("jayjs-current-theme", "orange");

      initTheme();

      // Should use the theme ID and apply current mode (default to light)
      expect(documentMock.documentElement.dataset.theme).toBe("orange-light");
      expect(documentMock.documentElement.dataset.themeMode).toBe("light");
    });

    it("should preserve legacy default themes as valid", () => {
      // Store legacy default theme
      localStorage.setItem("jayjs-current-theme", "dark");

      initTheme();

      // Should accept the legacy default theme
      expect(documentMock.documentElement.dataset.theme).toBe("dark");
    });
  });

  describe("CSS class support with theme definitions", () => {
    beforeEach(() => {
      const themes: TThemeDefinition[] = [
        { id: "orange", light: "orange-light", dark: "orange-dark" },
        { id: "red", light: "volcano", dark: "cave" },
      ];

      Object.assign(themeOptions, {
        target: documentMock.documentElement as unknown as HTMLElement,
        saveToLocalStorage: true,
        defaultTheme: "light",
        defaultDarkTheme: "dark",
        localStorageKey: "jayjs-current-theme",
        useAsDataset: false,
        useAsClass: true,
        themes,
      });
    });

    it("should apply theme classes correctly", () => {
      setTheme("red", "dark");

      expect(documentMock.documentElement.classList.remove).toHaveBeenCalledWith(
        "orange-light", "orange-dark", "volcano", "cave"
      );
      expect(documentMock.documentElement.classList.add).toHaveBeenCalledWith("cave");
    });
  });

  describe("backwards compatibility", () => {
    beforeEach(() => {
      // Test without theme definitions (old behavior)
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

    it("should work with old setTheme behavior", () => {
      setTheme("custom-theme");

      expect(documentMock.documentElement.dataset.theme).toBe("custom-theme");
      expect(documentMock.documentElement.dataset.themeMode).toBe("light");
    });

    it("should work with old toggleThemeMode fallback", () => {
      documentMock.documentElement.dataset.theme = "light";
      documentMock.documentElement.dataset.themeMode = "light";

      const result = toggleThemeMode();

      expect(result.theme).toBe("dark");
      expect(result.mode).toBe("dark");
    });
  });

  describe("getCurrentTheme", () => {
    beforeEach(() => {
      const themes: TThemeDefinition[] = [
        { id: "orange", light: "orange-light", dark: "orange-dark" },
        { id: "red", light: "volcano", dark: "cave" },
      ];

      Object.assign(themeOptions, {
        target: documentMock.documentElement as unknown as HTMLElement,
        saveToLocalStorage: true,
        defaultTheme: "light",
        defaultDarkTheme: "dark",
        localStorageKey: "jayjs-current-theme",
        useAsDataset: true,
        useAsClass: false,
        themes,
      });
    });

    it("should return current theme and mode", () => {
      // Set a theme with mode
      documentMock.documentElement.dataset.theme = "orange-light";
      documentMock.documentElement.dataset.themeMode = "light";

      const result = getCurrentTheme();

      expect(result).toEqual({ theme: "orange-light", mode: "light" });
    });

    it("should return dark mode theme", () => {
      documentMock.documentElement.dataset.theme = "volcano";
      documentMock.documentElement.dataset.themeMode = "dark";

      const result = getCurrentTheme();

      expect(result).toEqual({ theme: "volcano", mode: "dark" });
    });

    it("should default to light mode when themeMode is not set", () => {
      documentMock.documentElement.dataset.theme = "custom-theme";
      // No themeMode set

      const result = getCurrentTheme();

      expect(result).toEqual({ theme: "custom-theme", mode: "light" });
    });

    it("should use defaultTheme when no theme is set", () => {
      // No theme or mode set
      delete documentMock.documentElement.dataset.theme;
      delete documentMock.documentElement.dataset.themeMode;

      const result = getCurrentTheme();

      expect(result).toEqual({ theme: "light", mode: "light" });
    });

    it("should handle invalid theme mode", () => {
      documentMock.documentElement.dataset.theme = "custom-theme";
      documentMock.documentElement.dataset.themeMode = "invalid" as any;

      const result = getCurrentTheme();

      expect(result).toEqual({ theme: "custom-theme", mode: "light" });
    });

    it("should work without theme definitions", () => {
      // Remove theme definitions
      Object.assign(themeOptions, {
        themes: undefined,
      });

      documentMock.documentElement.dataset.theme = "my-theme";
      documentMock.documentElement.dataset.themeMode = "dark";

      const result = getCurrentTheme();

      expect(result).toEqual({ theme: "my-theme", mode: "dark" });
    });

    it("should return consistent results after theme changes", () => {
      // Set initial theme
      setTheme("red", "light");

      let result = getCurrentTheme();
      expect(result).toEqual({ theme: "volcano", mode: "light" });

      // Toggle mode
      toggleThemeMode();

      result = getCurrentTheme();
      expect(result).toEqual({ theme: "cave", mode: "dark" });
    });
  });
});
