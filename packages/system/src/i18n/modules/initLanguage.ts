import { i18nOptions } from "./i18nDefineOptions";
import { i18nContext } from "./i18nContext";

declare global {
  interface Navigator {
    userLanguage?: string;
  }
}

export function initLanguage() {
  if (navigator && (navigator.language || navigator.userLanguage)) {
    i18nOptions.defaultLocale = navigator.language || navigator.userLanguage || i18nOptions.defaultLocale;
  }

  const defaultLocaleStored = localStorage.getItem("default-locale");
  if (defaultLocaleStored) {
    i18nOptions.defaultLocale = defaultLocaleStored;
  }
  
  const defaultI18n = i18nOptions.languages.find((lang) => lang.code === i18nOptions.defaultLocale) || i18nOptions.languages[0];
  if (!defaultI18n) {
    throw new Error("@jay-js/system: Failed to load default language");
  }
  i18nContext.set(defaultI18n, { silent: true });
}