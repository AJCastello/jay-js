import { Ii18nConfig } from "../types";

export let i18nConfig: Ii18nConfig = {
  languages: [],
  defaultLocale: "en-US",
  saveToLocalStorage: true
};

export function i18nDefineConfig(config: Partial<Ii18nConfig>) {
  i18nConfig = { ...i18nConfig, ...config };
}