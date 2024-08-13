import { Ii18nOptions } from "../types/index.js";

export let i18nOptions: Ii18nOptions = {
  languages: [],
  defaultLocale: "en-us",
  saveToLocalStorage: true,
  nestedKeys: false,
};

export function i18nDefineOptions(options: Partial<Ii18nOptions>) {
  i18nOptions = { ...i18nOptions, ...options };
}