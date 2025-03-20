import { State } from "../../state/index.js";
import { Ti18nLanguages, Ti18nOptions, Ti18nState } from "../types.js";

/**
 * Default internationalization options
 * @type {Ti18nOptions}
 */
export const i18nOptions: Ti18nOptions = {
  languages: [],
  defaultLocale: "en",
  saveToLocalStorage: true,
  localStorageKey: "jayjs-i18n-default-locale",
  nestedKeys: false
};

/**
 * State management for internationalization
 * Tracks the current locale and loaded language data
 * @type {State<Ti18nState>}
 */
export const i18nState = State<Ti18nState>({
  currentLocale: i18nOptions.defaultLocale,
  language: {} as Ti18nLanguages
});

/**
 * Defines or updates internationalization options
 * @param {Partial<Ti18nOptions>} options - The i18n options to set or update
 */
export function i18nDefineOptions(options: Partial<Ti18nOptions>): void {
  Object.assign(i18nOptions, options);
}
