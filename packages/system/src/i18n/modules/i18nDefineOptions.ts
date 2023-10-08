import { Ii18nOptions } from "../types";

export let i18nOptions: Ii18nOptions = {
  languages: [],
  defaultLocale: "en-US",
  saveToLocalStorage: true
};

export function i18nDefineOptions(options: Partial<Ii18nOptions>) {
  i18nOptions = { ...i18nOptions, ...options };
}