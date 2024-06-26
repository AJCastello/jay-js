import { i18nOptions } from "../modules/i18nDefineOptions.js";
import { i18nContext } from "../modules/i18nContext.js";
import { AllPaths, GetTypeAtPath } from "../types/index.js";

interface Ii18nContext {
  emptyValue: "string"
}

export function useI18n<T>(): <
  Path extends AllPaths<Ii18nContext & T>
>(
  path: Path,
  data?: Record<string, any>,
  options?: { default?: string }
) => GetTypeAtPath<Ii18nContext & T, Path> {
  return (path, data, options) => {
    let result = i18nContext.get().data;

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
