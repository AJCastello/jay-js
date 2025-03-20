import { Ti18nLanguages, Ti18nOptions } from "../types.js";
import { i18nDefineOptions, i18nOptions, i18nState } from "./configuration.js";

/**
 * Initializes the internationalization system with the appropriate language
 * 
 * This function:
 * 1. Detects the browser language if available
 * 2. Checks for saved language preference in localStorage
 * 3. Sets the initial language
 * 
 * @throws Error if the default language cannot be loaded
 */
export function initLanguage() {
  if (navigator && navigator.language) {
    const locale = navigator.language || i18nOptions.defaultLocale;
    i18nOptions.defaultLocale = locale.toLowerCase();
  }

  const defaultLocaleStored = localStorage.getItem(i18nOptions.localStorageKey);
  if (defaultLocaleStored) {
    i18nOptions.defaultLocale = defaultLocaleStored;
  }

  const defaultI18n = i18nOptions.languages.find((lang) => lang.code === i18nOptions.defaultLocale) || i18nOptions.languages[0];
  if (!defaultI18n) {
    throw new Error("Failed to load default language");
  }

  localStorage.setItem(i18nOptions.localStorageKey, defaultI18n.code);
  i18nState.set({
    currentLocale: defaultI18n.code,
    language: defaultI18n,
  }, { silent: true });
}

/**
 * Changes the active language
 * 
 * @param {string} code - The language code to switch to
 * @throws Error if the specified language code is not found in the available languages
 */
export function setLanguage(code: string) {
  const language = i18nOptions.languages.find((lang) => lang.code === code);
  if (!language) {
    throw new Error(`Language ${code} not found`);
  }
  if (i18nOptions.saveToLocalStorage) {
    try {
      localStorage.setItem("default-locale", code);
    } catch (e) {
      console.warn("Failed to save theme to localStorage:", e);
    }
  }
  i18nState.set({
    currentLocale: code,
    language
  });
}

/**
 * Provides internationalization support and handles language loading
 * 
 * @param {function} onLoad - Callback function that receives the language data when loaded
 * @param {Partial<Ti18nOptions>} [options] - Optional configuration options for i18n
 * @throws Error if no languages are defined in the options
 */
export function i18nProvider(onLoad: (i18n: Ti18nLanguages) => void, options?: Partial<Ti18nOptions>) {
  if (options) {
    i18nDefineOptions(options);
  }
  initLanguage();
  if (!i18nOptions.languages.length) {
    throw new Error("No languages defined");
  }
  i18nState.sub("i18n", async (i18n) => {
    if (!i18n.language.data) {
      if (i18n.language.import) {
        const language = await i18n.language.import();
        i18n.language.data = language;
      }
    }
    onLoad(i18n.language);
  }, true);
}

/**
 * Returns the current active locale code
 * 
 * @returns {string} The current locale code
 */
export function getCurrentLocale(): string {
  return i18nState.get().currentLocale;
}