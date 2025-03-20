import { AllPaths, GetTypeAtPath } from "../types.js";
import { i18nOptions, i18nState } from "../core/configuration.js";

export function useI18n<T>(): <
  Path extends AllPaths<T>
>(
  path: Path,
  data?: Record<string, any>,
  options?: { default?: string }
) => GetTypeAtPath<T, Path> {
  return (path, data, options) => {
    let result = i18nState.get().language.data;

    if (!result) {
      return options?.default || path as any;
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