
import { Ii18nLanguages, Ii18nOptions } from "../types.js";
import { i18nDefineOptions, i18nOptions, i18nState } from "./configuration.js";

export function initLanguage() {
  if (navigator && navigator.language) {
    const locale = navigator.language || i18nOptions.defaultLocale;
    i18nOptions.defaultLocale = locale.toLowerCase();
  }

  const defaultLocaleStored = localStorage.getItem(i18nOptions.localStorageKey);
  if (defaultLocaleStored) {
    i18nOptions.defaultLocale = defaultLocaleStored;
  }

  const defaultI18n = i18nOptions.languages.find((lang) => lang.code === i18nOptions.defaultLocale) || i18nOptions.languages[0];
  if (!defaultI18n) {
    throw new Error("Failed to load default language");
  }

  localStorage.setItem(i18nOptions.localStorageKey, defaultI18n.code);
  i18nState.set({
    currentLocale: defaultI18n.code,
    language: defaultI18n,
  }, { silent: true });
}

export function setLanguage(code: string) {
  const language = i18nOptions.languages.find((lang) => lang.code === code);
  if (!language) {
    throw new Error(`Language ${code} not found`);
  }
  if (i18nOptions.saveToLocalStorage) {
    try {
      localStorage.setItem("default-locale", code);
    } catch (e) {
      console.warn("Failed to save theme to localStorage:", e);
    }
  }
  i18nState.set({
    currentLocale: code,
    language
  });
}

export function i18nProvider(onLoad: (i18n: Ii18nLanguages) => void, options?: Partial<Ii18nOptions>) {
  if (options) {
    i18nDefineOptions(options);
  }
  initLanguage();
  if (!i18nOptions.languages.length) {
    throw new Error("No languages defined");
  }
  i18nState.sub("i18n", async (i18n) => {
    if (!i18n.language.data) {
      if (i18n.language.import) {
        const language = await i18n.language.import();
        i18n.language.data = language;
      }
    }
    onLoad(i18n.language);
  }, true);
}

export function getCurrentLocale(): string {
  return i18nState.get().currentLocale;
}