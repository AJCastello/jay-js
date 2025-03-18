import { State } from "../../state/index.js";
import { Ii18nOptions, Ii18nState } from "../types.js";

/**
 * Default i18n configuration options.
 */
export const i18nOptions: Ii18nOptions = {
  languages: [],
  defaultLocale: "en",
  saveToLocalStorage: true,
  nestedKeys: true
};

/**
 * Global i18n state.
 */
export const i18nState = State<Ii18nState>({
  currentLocale: i18nOptions.defaultLocale,
  translations: {}
});

/**
 * Defines or updates i18n configuration options.
 * @param {Partial<Ii18nOptions>} options - Overrides default i18n options.
 */
export function i18nDefineOptions(options: Partial<Ii18nOptions>): void {
  Object.assign(i18nOptions, options);
}

/**
 * Gets a translation by a nested path.
 * @param {any} obj - Translation resource object.
 * @param {string} path - Nested key path.
 * @returns {string} The resolved translation or the path if not found.
 */
export function getNestedTranslation(obj: any, path: string): string {
  return path.split(".").reduce((acc, part) => acc?.[part], obj) || path;
}

/**
 * Interpolates parameters into a translation string.
 * @param {string} text - Translation string containing placeholders.
 * @param {Record<string, any>} [params] - Key-value pairs for interpolation.
 * @returns {string} The transformed string.
 */
export function interpolateParams(text: string, params?: Record<string, any>): string {
  if (!params) return text;
  
  return text.replace(/\{(\w+)\}/g, (_, key) => {
    return params[key]?.toString() || `{${key}}`;
  });
}