import { State } from "../../state/index.js";
import { Ii18nLanguages, Ii18nOptions, Ii18nState } from "../types.js";

/**
 * Default internationalization options
 * @type {Ii18nOptions}
 */
export const i18nOptions: Ii18nOptions = {
  languages: [],
  defaultLocale: "en",
  saveToLocalStorage: true,
  localStorageKey: "jayjs-i18n-default-locale",
  nestedKeys: false
};

/**
 * State management for internationalization
 * Tracks the current locale and loaded language data
 * @type {State<Ii18nState>}
 */
export const i18nState = State<Ii18nState>({
  currentLocale: i18nOptions.defaultLocale,
  language: {} as Ii18nLanguages
});

/**
 * Defines or updates internationalization options
 * @param {Partial<Ii18nOptions>} options - The i18n options to set or update
 */
export function i18nDefineOptions(options: Partial<Ii18nOptions>): void {
  Object.assign(i18nOptions, options);
}
