import { i18nConfig } from "./i18nDefineConfig";
import { i18nContext } from "./i18nContext";

declare global {
  interface Navigator {
    userLanguage?: string;
  }
}

export function initLanguage() {
  if (navigator && (navigator.language || navigator.userLanguage)) {
    i18nConfig.defaultLocale = navigator.language || navigator.userLanguage || i18nConfig.defaultLocale;
  }

  const defaultLocaleStored = localStorage.getItem("default-locale");
  if (defaultLocaleStored) {
    i18nConfig.defaultLocale = defaultLocaleStored;
  }
  
  const defaultI18n = i18nConfig.languages.find((lang) => lang.code === i18nConfig.defaultLocale) || i18nConfig.languages[0];
  if (!defaultI18n) {
    throw new Error("@jay-js/system: Failed to load default language");
  }
  i18nContext.set(defaultI18n, { silent: true });
}