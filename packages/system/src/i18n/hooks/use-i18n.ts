import { i18nOptions, i18nState } from "../core/configuration.js";
import type { AllPaths, GetTypeAtPath } from "../types.js";

/**
 * Hook for accessing internationalized strings with type safety
 *
 * @template T - The type of the translation object (derived from translation files)
 * @returns A translation function that accepts a key and optional data for variable substitution
 *
 * @example
 * // With flat keys (default approach)
 * type Translations = {
 *   'Hello': string;
 *   'Welcome, {{name}}!': string;
 *   'You have {{count}} messages': string;
 * };
 *
 * const t = useI18n<Translations>();
 *
 * // Get a translation
 * const hello = t('Hello');
 *
 * // With variable substitution
 * const welcome = t('Welcome, {{name}}!', { name: 'User' });
 * const messages = t('You have {{count}} messages', { count: 5 });
 *
 * @example
 * // With nested keys (requires nestedKeys: true in options)
 * type NestedTranslations = {
 *   greetings: {
 *     hello: string;
 *     welcome: string;
 *   }
 * };
 *
 * const t = useI18n<NestedTranslations>();
 * const hello = t('greetings.hello');
 */
export function useI18n<T>(): <Path extends AllPaths<T>>(
	path: Path,
	data?: Record<string, any>,
	options?: { default?: string },
) => GetTypeAtPath<T, Path> {
	return (path, data, options) => {
		let result = i18nState.get().language.data;

		if (!result) {
			return options?.default || (path as any);
		}

		if (!i18nOptions.nestedKeys) {
			let translation = (result as any)[path] || options?.default || path;
			if (data) {
				translation = String(translation).replace(/{{(.*?)}}/g, (match, p1) => {
					return data[p1.trim()] || match;
				}) as unknown as T;
			}
			return translation;
		}

		const pathArray = (path as unknown as string).split(".");

		for (const key of pathArray) {
			result = (result as any)[key] || options?.default || key;
			if (data) {
				result = String(result).replace(/{{(.*?)}}/g, (match, p1) => {
					return data[p1.trim()] || match;
				}) as unknown as T;
			}
		}
		return result as any;
	};
}
