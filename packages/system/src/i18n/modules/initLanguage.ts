import { i18nOptions } from "./i18nDefineOptions.js";
import { i18nContext } from "./i18nContext.js";

declare global {
  interface Navigator {
    userLanguage?: string;
  }
}

export function initLanguage() {
  if (navigator && (navigator.language || navigator.userLanguage)) {
    const locale = navigator.language || navigator.userLanguage || i18nOptions.defaultLocale;
    i18nOptions.defaultLocale = locale.toLowerCase();
  }

  const defaultLocaleStored = localStorage.getItem("default-locale");
  if (defaultLocaleStored) {
    i18nOptions.defaultLocale = defaultLocaleStored;
  }
  
  const defaultI18n = i18nOptions.languages.find((lang) => lang.code === i18nOptions.defaultLocale) || i18nOptions.languages[0];
  if (!defaultI18n) {
    throw new Error("@jay-js/system: Failed to load default language");
  }

  localStorage.setItem("default-locale", defaultI18n.code);
  i18nContext.set(defaultI18n, { silent: true });
}