import { i18nContext } from "../modules/i18nContext";
import { AllPaths, GetTypeAtPath } from "../types";

interface Ii18nContext {
  emptyValue: "string"
}

export function useI18n<T>(){
  return function i18n<Path extends AllPaths<Ii18nContext & T>>(
    path: Path,
    data?: Record<string, any>,
    options?: {
      default?: string
    }): GetTypeAtPath<T, Path> {
    const pathArray = (path as unknown as string).split(".");
    let result = i18nContext.get().data;
    
    if (!result) {
      return options?.default || path as any;
    }
    for (const key of pathArray) {
      result = (result as any)[key] || options?.default || key;
      if (data) {
        result = String(result).replace(/{{(.*?)}}/g, (match, p1) => {
          return data[p1.trim()] || match;
        }) as unknown as T;
      }
    }
    return result as any;
  }
}